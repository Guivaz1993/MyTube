const modelRooms = require("../models/rooms");

const createRoom = async (req, res) => {
  const { name, video_id } = req.body;
  const { id: user_id } = req.user;

  try {
    const newRoom = await modelRooms.createRoom(name, user_id, video_id);

    if (!newRoom) {
      return res
        .status(400)
        .json({ message: "Não foi possível criar a sua sala." });
    }

    return res.status(201).json({
      message: "Sala criada com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await modelRooms.getRoom(id);

    if (!room) {
      return res.status(400).json({ message: "Sala não encontrada" });
    }

    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const changeVideo = async (req, res) => {
  const { id, video_id } = req.body;

  try {
    const room = await modelRooms.changeVideoRoom(id, video_id);

    if (room.length === 0) {
      return res
        .status(400)
        .json({ message: "Não foi possível alterar o vídeo." });
    }

    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRoom,
  getRoom,
  changeVideo,
};
