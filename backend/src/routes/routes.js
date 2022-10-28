const express = require("express");
const users = require("../controllers/users");
const videos = require("../controllers/videos");
const rooms = require("../controllers/rooms");
const route = express();

route.post("/signup", users.signUp);
route.post("/signin", users.signIn);

route.use(users.tokenVerify);

route.get("/user", users.getUser);

route.get("/videos", videos.listVideos);

route.post("/newroom", rooms.createRoom);
route.get("/room/:id", rooms.getRoom);
route.patch("/room", rooms.changeVideo);

module.exports = route;
