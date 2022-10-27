const knex = require("../server/connection");

const usernameExists = async (username) => {
  const user = await knex("users").where({ username }).first();

  return user;
};

const insertUser = async (username, password) => {
  const user = await knex("users")
    .insert({ username, password })
    .returning("*");

  return user;
};

const getUser = async (id) => {
  const user = await knex("users").where({ id }).first();
  return user;
};

module.exports = {
  usernameExists,
  insertUser,
  getUser,
};
