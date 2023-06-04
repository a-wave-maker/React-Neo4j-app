const neo4j = require("neo4j-driver");
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "test1234")
);

const misc = require("./misc_functions");

const LIKED = 1;
const DISLIKED = -1;
const NEUTRAL = 0;

// apoc
exports.createUser = async (data) => {
  const session = driver.session({ database: "neo4j" });
  const emailExists = await session.run(
    `MATCH (n:User { email: $email }) RETURN n`,
    { email: data.email }
  );
  try {
    if (emailExists.records.length > 0) {
      return { message: "Email already taken" };
    }
    const query = `MATCH (u:User)
      WITH coalesce(max(u.id), 0) + 1 as nextId
      CREATE (n:User { id: nextId, email: $email, username: $username, password: apoc.util.sha256([$password])}) RETURN n`;
    await session.run(query, {
      email: data.email,
      username: data.username,
      password: data.password,
    });
    return true;
  } catch (e) {
    console.log(e);
    return { message: "Something went wrong. Try again later" };
  } finally {
    session.close();
  }
};

// apoc
exports.loginUser = async (email, password) => {
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (u:User) WHERE u.email=$email
    WITH u, (apoc.util.sha256([$password]) = u.password) AS passwordMatches
    RETURN u.id, u.email, passwordMatches, u.username LIMIT 1`;
  try {
    const result = await session.run(query, {
      email: email,
      password: password,
    });
    if (JSON.stringify(result.records) === JSON.stringify([])) {
      return { user: undefined, message: "Wrong email" };
    } else if (result.records[0]._fields[2] === true) {
      return {
        user: {
          id: misc.idToNumber(result.records[0]._fields[0]),
          username: result.records[0]._fields[3],
        },
        message: "Logged in successfully",
      };
    } else {
      return { user: undefined, message: "Wrong password" };
    }
  } catch (e) {
    console.log(e);
    return {
      user: undefined,
      message: "Something went wrong, try again later",
    };
  } finally {
    session.close();
  }
};

exports.checkPersonal = async (userid, imgid) => {
  //   console.log(userid, imgid);
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (u:User {id: $userid}), (i:Image {id: $imgid})
    OPTIONAL MATCH (u)-[r:LIKED|FAVOURITED|DISLIKED]->(i)
    RETURN
      CASE
        WHEN exists((u)-[:LIKED]->(i)) AND exists((u)-[:FAVOURITED]->(i)) THEN 'F-liked'
        WHEN exists((u)-[:DISLIKED]->(i)) AND exists((u)-[:FAVOURITED]->(i)) THEN 'F-disliked'
        WHEN exists((u)-[:LIKED]->(i)) THEN 'liked'
        WHEN exists((u)-[:DISLIKED]->(i)) THEN 'disliked'
        WHEN exists((u)-[:FAVOURITED]->(i)) THEN 'favourited'
        ELSE 'none'
      END AS relation
    LIMIT 1`;

  try {
    const result = await session.run(query, {
      userid: neo4j.int(userid),
      imgid: neo4j.int(imgid),
    });
    const relation = result.records[0]._fields[0].toString();
    if (result.records.length > 0) {
      //   console.log(relation);
      switch (relation) {
        case "F-liked":
          return { liked: LIKED, favourited: true };
        case "F-disliked":
          return { liked: DISLIKED, favourited: true };
        case "liked":
          return { liked: LIKED, favourited: false };
        case "disliked":
          return { liked: DISLIKED, favourited: false };
        case "favourited":
          return { liked: NEUTRAL, favourited: true };
        case "none":
          return { liked: NEUTRAL, favourited: false };
      }
    } else {
      return { liked: NEUTRAL, favourited: false };
    }
  } catch (e) {
    console.log(e);
    return { liked: undefined, favourited: undefined };
  } finally {
    session.close();
  }
};

exports.postComment = async (imageid, authorid, commentid, text) => {
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (u:User {id: $authorid})
    MATCH (i:Image {id: $imageid})
    CREATE (u)-[:AUTHOR]->(c:Comment {id: $commentid, text: $text})<-[:COMMENT]-(i)`;
  try {
    const result = await session.run(query, {
      imageid: imageid,
      authorid: authorid,
      commentid: commentid,
      text: text,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    session.close();
  }
};

exports.likeImage = async (imgid, userid) => {
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (u:User {id: $userid})-[r:LIKED|DISLIKED]->(i:Image {id: $imgid})
    WITH u, i, r
    WHERE r.type = "LIKED"
    DELETE r
    RETURN u, i
    UNION
    MATCH (u:User {id: $userid}), (i:Image {id: $imgid})
    WHERE NOT (u)-[:LIKED|DISLIKED]->(i)
    CREATE (u)-[:LIKED]->(i)
    RETURN u, i`;
  try {
    await session.run(query, { userid: userid, imgid: imgid });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    session.close();
  }
};

exports.dislikeImage = async (imgid, userid) => {
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (u:User {id: $userid})-[r:DISLIKED|LIKED]->(i:Image {id: $imgid})
    WITH u, i, r
      WHERE r.type = "DISLIKED"
      DELETE r
      RETURN u, i
      UNION
      MATCH (u:User {id: $userid}), (i:Image {id: $imgid})
      WHERE NOT (u)-[:DISLIKED|LIKED]->(i)
      CREATE (u)-[:DISLIKED]->(i)
    RETURN u, i`;
  try {
    await session.run(query, { userid: userid, imgid: imgid });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    session.close();
  }
};

// apoc
exports.favouriteImage = async (imgid, userid) => {
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (u:User {id: $userid}), (i:Image {id: $imgid})
    OPTIONAL MATCH (u)-[f:FAVOURITED]->(i)
    WITH u, i, f
    CALL apoc.do.when(
      f is null, 
      "CREATE (u)-[:FAVOURITED]->(i)", 
      "DELETE f", 
      {u: u, i: i, f: f}
    ) YIELD value
    RETURN value`;
  try {
    await session.run(query, { userid: userid, imgid: imgid });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    session.close();
  }
};

// apoc
exports.editUser = async (id, data) => {
  const session = driver.session({ database: "neo4j" });
  const checkPassword = `MATCH (u:User) WHERE u.id=$id
    WITH u, (apoc.util.sha256([$password]) = u.password) AS passwordMatches
    RETURN passwordMatches`;
  const namechange = `MATCH (u:User {id: $id}) 
    SET u.username = $newUsername RETURN u`;
  const passwordchange = `MATCH (u:User {id: $id}) 
    SET u.password = apoc.util.sha256([$newPassword]) RETURN u`;
  try {
    var re = "";
    const check = await session.run(checkPassword, {
      id: id,
      password: data.oldPassword,
    });
    if (check) {
      if (data.username !== "") {
        await session.run(namechange, { id: id, newUsername: data.username });
        re = re + "Username changed. ";
      }
      if (data.password !== "") {
        await session.run(passwordchange, {
          id: id,
          newPassword: data.password,
        });
        re = re + "Password changed. ";
      }
    } else {
      return "Wrong old password";
    }
    if (re === "") {
      return "Something went wrong. Nothing has been changed";
    }
    return re + "Log in again.";
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    session.close();
  }
};

exports.deleteUser = async (id) => {
  const session = driver.session({ database: "neo4j" });
  const query = `MATCH (u:User {id: $id}) 
    DETACH DELETE u`;
  try {
    await session.run(query, { id: neo4j.int(id) });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  } finally {
    session.close();
  }
};
