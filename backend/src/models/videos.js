const knex = require("../server/connection");

const listVideos = async (username) => {
  const list = await knex("videos").returning("*");

  return list;
};

module.exports = {
  listVideos,
};
