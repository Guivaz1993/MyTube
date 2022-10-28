const knex = require("../server/connection");

const createRoom = async (name, user_id, video_id) => {
  const room = await knex("rooms")
    .insert({ name, user_id, video_id })
    .returning("*");
  return room;
};

const getRoom = async (id) => {
  const room = await knex("rooms")
    .select("rooms.id", "rooms.name", "rooms.user_id", "videos.link")
    .where({ "rooms.id": id })
    .join("videos", "videos.id", "rooms.video_id")
    .returning("*");
  return room;
};

const changeVideoRoom = async (id, video_id) => {
  const room = await knex("rooms")
    .update({ video_id })
    .where({ id })
    .returning("*");
  return room;
};

module.exports = { createRoom, getRoom, changeVideoRoom };
