const modelVideo = require("../models/videos");

const listVideos = async (req, res) => {
  try {
    const list = await modelVideo.listVideos();

    if (list.length === 0) {
      return res.status(400).json({
        message: "Nenhum vídeo cadastrado",
      });
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  listVideos,
};
