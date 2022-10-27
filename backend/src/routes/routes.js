const express = require("express");
const users = require("../controllers/users");
const route = express();

route.post("/signup", users.signUp);
route.post("/signin", users.signIn);

//autenticação

route.use(users.tokenVerify);

route.get("/user", users.getUser);

//criar sala post
//mudar video patch

module.exports = route;
