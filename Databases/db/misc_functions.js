const neo4j = require("neo4j-driver");
const fs = require("fs");

// parses a neo4j number (usually an id) as JS number if neccessary
exports.idToNumber = (id) => {
  if (Number.isInteger(id)) {
    return id;
  } else if (neo4j.integer.inSafeRange(id)) {
    return id.toNumber();
  }
  return false;
};

// function to reduce code repetition, parses data returned from a neo4j query into a formatted object
exports.parseImageData = (fields) => {
  return {
    author: {
      name: fields[0].properties.name,
      description: fields[0].properties.description,
    },
    img: {
      id: this.idToNumber(fields[1].properties.id),
      url: fields[1].properties.url,
      title: fields[1].properties.title,
      tags: fields[1].properties.tags,
    },
    rating: {
      likes: this.idToNumber(fields[2]),
      dislikes: this.idToNumber(fields[3]),
    },
  };
};

// logs activity in the access.log file
exports.logActivity = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${
    req.originalUrl
  }\n`;

  fs.appendFile("access.log", log, (err) => {
    if (err) {
      console.error(err);
    }
  });

  next();
};
