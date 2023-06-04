const express = require("express");
const img_calls = require("./db/images_calls");
const usr_calls = require("./db/user_calls");
const misc = require("./db/misc_functions");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(misc.logActivity);
const port = 3333;

const RANDOM_IMAGE_NUMBER = 6;

// gets a RANDOM_IMAGE_NUMBER number of images in an array
app.get("/images", async (req, res) => {
  const result = await img_calls.getRandomImages(RANDOM_IMAGE_NUMBER);
  if (result === undefined) {
    res.send([]);
    return [];
  }
  res.send(result);
  return;
});

// gets all images with rating and author in an array, undefined if something goes wrong
app.get("/images/all", async (req, res) => {
  const result = await img_calls.getAllImages();
  if (result === undefined || result === []) {
    res.send(undefined);
    return undefined;
  }
  res.send(result);
  return;
});

// gets an image by id with author and rating
app.get("/image/:id", async (req, res) => {
  const { id } = req.params;
  const result = await img_calls.getImageById(id);
  if (result === undefined || result === {}) {
    res.send(undefined);
    return undefined;
  }
  res.send(result);
  return;
});

// gets all images that are related
app.get("/related/:id", async (req, res) => {
  const { id } = req.params;
  const result = await img_calls.getRelatedImages(id);
  if (result === undefined) {
    res.send([]);
    return [];
  }
  res.send(result);
  return;
});

// gets comments for an image of given id
app.get("/comments/:id", async (req, res) => {
  const { id } = req.params;
  const result = await img_calls.getComments(id);
  res.send(result);
  return;
});

// creates a user account, returns a message when something goes wrong
app.post("/register", async (req, res) => {
  const { data } = req.body;
  const result = await usr_calls.createUser(data);
  res.send(result);
  return;
});

// returns an object {id, username} (undefined if not found) and a message of successful or unsuccessful login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await usr_calls.loginUser(email, password);
  res.send(result);
  return;
});

// modifies username and/or password, depending on what was given, then returns a message
app.patch("/user", async (req, res) => {
  const { id, data } = req.body;
  const result = await usr_calls.editUser(id, data);
  console.log(result);
  res.send(result);
  return;
});

// deletes user, return true if successful
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const result = await usr_calls.deleteUser(id);
  res.send(result);
  return;
});

// gets the rating of a logged in user
app.post("/image/personal", async (req, res) => {
  const { imgid, userid } = req.body;
  const result = await usr_calls.checkPersonal(userid, imgid);
  res.send(result);
  return;
});

// creates a comment
app.post("/comment", async (req, res) => {
  const { imageid, authorid, commentid, text } = req.body;
  const result = await usr_calls.postComment(
    imageid,
    authorid,
    commentid,
    text
  );
  res.send(result);
  return;
});

// creates or removes LIKED relation to an image, also removing DISLIKED if it exists
app.patch("/like", async (req, res) => {
  console.log("liking");
  const { imgid, userid } = req.body;
  const result = await usr_calls.likeImage(imgid, userid);
  res.send(result);
  return;
});

// creates or removes DISLIKED relation to an image, also removing LIKED if it exists
app.patch("/dislike", async (req, res) => {
  console.log("disliking");
  const { imgid, userid } = req.body;
  const result = await usr_calls.dislikeImage(imgid, userid);
  res.send(result);
  return;
});

// creates or removes FAVOURITED relation to an image
app.patch("/favourite", async (req, res) => {
  console.log("favouriting");
  const { imgid, userid } = req.body;
  const result = await usr_calls.favouriteImage(imgid, userid);
  res.send(result);
  return;
});

// gets all images that a user has favourited
app.post("/favourites", async (req, res) => {
  const { userid } = req.body;
  const result = await img_calls.getFavourites(userid);
  res.send(result);
  return;
});

// returns a sorted array of all images, can sort by most likes ("likes"), most dislikes ("disliked") or ratio ("top")
app.post("/sorted/:type", async (req, res) => {
  const { type } = req.params;
  const result = await img_calls.sortedImages(type);
  res.send(result);
  return;
});

// returns pattern matched search results
app.get("/search", async (req, res) => {
  const query = req.query.q;
  const result = await img_calls.searchImages(query);
  res.send(result);
  return;
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
