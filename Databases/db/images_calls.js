const neo4j = require("neo4j-driver");
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "test1234")
);

const misc = require("./misc_functions");

// apoc
exports.getRandomImages = async (n) => {
  const session = driver.session({ database: "neo4j" });
  const query = `CALL apoc.cypher.run(
    'MATCH (i:Image)
    WITH i ORDER BY rand() LIMIT $n
    RETURN DISTINCT i.id AS id, i.url AS url, i.title AS title',
    {n: $limit}
    ) YIELD value
    RETURN value`;
  try {
    const result = await session.run(query, { limit: neo4j.int(n) });
    const images = result.records.map((res) => {
      if (misc.idToNumber(res._fields[0].id) !== false) {
        return {
          id: misc.idToNumber(res._fields[0].id),
          url: res._fields[0].url,
          title: res._fields[0].title,
        };
      } else return;
    });
    return images;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    session.close();
  }
};

exports.getAllImages = async () => {
  // console.log(id)
  const session = driver.session({ database: "neo4j" });
  const query =
    "MATCH (p:Photographer)-[:AUTHOR]->(i:Image) \
      OPTIONAL MATCH (i)<-[l:LIKED]-(:User) \
      OPTIONAL MATCH (i)<-[d:DISLIKED]-(:User) \
      RETURN p, i, count(l) AS likes, count(d) AS dislikes";
  try {
    const result = await session.run(query);
    // Unwind the result into an object containing the author and image fields
    const fieldsarr = result.records.map((record) => {
      const fields = record._fields;
      const parsed = misc.parseImageData(fields);

      return parsed;
    });

    // console.log(parsed)
    return fieldsarr;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    session.close();
  }
};

exports.getImageById = async (id) => {
  const session = driver.session({ database: "neo4j" });
  const query =
    "MATCH (p:Photographer)-[:AUTHOR]->(i:Image) \
      WHERE i.id = $id \
      OPTIONAL MATCH (i)<-[l:LIKED]-(:User) \
      OPTIONAL MATCH (i)<-[d:DISLIKED]-(:User) \
      RETURN p, i, count(l) AS likes, count(d) AS dislikes LIMIT 1";
  try {
    const result = await session.run(query, { id: neo4j.int(id) });
    // Unwind the result into an object containing the author and image fields
    const fields = result.records[0]._fields;
    const parsed = misc.parseImageData(fields);
    // console.log(parsed);
    return parsed;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    session.close();
  }
};

exports.getRelatedImages = async (id) => {
  const session = driver.session({ database: "neo4j" });
  const query =
    "MATCH (i1:Image)-[:RELATED]->(i2:Image) \
      WHERE i1.id = $id \
      RETURN DISTINCT i2.id, i2.url, i2.title";
  try {
    const result = await session.run(query, { id: neo4j.int(id) });
    // Return id, url and title in an object for each image
    const images = result.records.map((res) => {
      if (misc.idToNumber(res._fields[0]) !== false) {
        return {
          id: misc.idToNumber(res._fields[0]),
          url: res._fields[1],
          title: res._fields[2],
        };
      } else return;
    });
    return images;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    session.close();
  }
};

exports.getComments = async (id) => {
  const session = driver.session({ database: "neo4j" });
  const query =
    "MATCH (i:Image)-[:COMMENT]->(c:Comment)<-[:AUTHOR]-(u:User) \
      WHERE i.id = $id \
      RETURN DISTINCT c.id, c.text, u.username";
  try {
    const result = await session.run(query, { id: neo4j.int(id) });
    const parsed = result.records.map((res) => {
      return {
        id: misc.idToNumber(res._fields[0]),
        text: res._fields[1],
        author: res._fields[2],
      };
    });
    return parsed;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    session.close();
  }
};

exports.getFavourites = async (userid) => {
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (:User {id: $userid})-[:FAVOURITED]->(i:Image)
    RETURN i.id, i.url, i.title`;
  try {
    const result = await session.run(query, { userid: userid });
    const images = result.records.map((res) => {
      if (misc.idToNumber(res._fields[0]) !== false) {
        return {
          id: misc.idToNumber(res._fields[0]),
          url: res._fields[1],
          title: res._fields[2],
        };
      } else return [];
    });
    return images;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    session.close();
  }
};

exports.sortedImages = async (type) => {
  const session = driver.session({ database: "neo4j" });
  const query = `WITH $type AS sortType
    MATCH (p:Photographer)-[:AUTHOR]->(i:Image)
    OPTIONAL MATCH (i)<-[l:LIKED]-()
    OPTIONAL MATCH (i)<-[d:DISLIKED]-()
    WITH i, p, count(l) AS likes, count(d) AS dislikes, sortType
    RETURN p, i, likes, dislikes,
    CASE sortType
      WHEN "likes" THEN likes + (1.0 / (dislikes + 1))
      WHEN "dislikes" THEN dislikes + (1.0 / (likes + 1))
      WHEN "top" THEN (toFloat(likes)/toFloat(dislikes + 1) + likes - dislikes)
      ELSE i:id
    END AS sortValue
    ORDER BY sortValue DESC`;
  try {
    const result = await session.run(query, {
      type: type,
    });
    const fieldsarr = result.records.map((record) => {
      const fields = record._fields;
      const parsed = misc.parseImageData(fields);
      return parsed;
    });
    return fieldsarr;
  } catch (e) {
    console.log(e);
    return [];
  } finally {
    session.close();
  }
};

//apoc
exports.searchImages = async (search) => {
  if (search === "" || search === undefined) {
    return [];
  }
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (i:Image)<-[:AUTHOR]-(p:Photographer)
      WHERE apoc.text.toUpperCase(i.title) =~ apoc.text.toUpperCase($search)
        OR i.tags CONTAINS $search
        OR apoc.text.toUpperCase(p.name) =~ apoc.text.toUpperCase($search)
        OR apoc.text.toUpperCase(i.title) CONTAINS apoc.text.toUpperCase($search)
        OR any(t in i.tags WHERE apoc.text.toUpperCase(t) CONTAINS apoc.text.toUpperCase($search))
        OR apoc.text.toUpperCase(p.name) CONTAINS apoc.text.toUpperCase($search)
      RETURN i.id, i.url, i.title, i.tags, p.name`;
  const result = await session.run(query, { search: search });
  const parsed = result.records.map((result) => {
    return {
      id: misc.idToNumber(result._fields[0]),
      url: result._fields[1],
      title: result._fields[2],
      tags: result._fields[3],
      author: result._fields[4],
    };
  });
  return parsed;
};
