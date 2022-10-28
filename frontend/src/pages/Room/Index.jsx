/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/media-has-caption */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import usePlayerState from "../../hooks/usePlayerState";

import Header from "../../components/Header/Index";
import ModalLogin from "../../components/ModalLogin/Index";
import useUser from "../../hooks/useUser";
import Video from "../../assets/videos/ICON_VERSION8_1.mp4";
import Video2 from "../../assets/videos/NEON_arrow_aqua_orange_color.mp4";

import "./styles.css";
import { getItem } from "../../utils/storage";
import { get, patch } from "../../services/functions";

export default function Room() {
  const { openModalLogin } = useUser();
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [room, setRoom] = useState({
    id: 1,
    name: "Nova Sala",
    user_id: 7,
    link: "../../assets/videos/ICON_VERSION8_1.mp4",
  });
  const $videoPlayer = useRef(null);
  const navigate = useNavigate();
  const {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleVideoChangePercentage,
    restartVideo,
  } = usePlayerState($videoPlayer);
  const token = getItem("token");

  async function loadingRoomInfos() {
    try {
      const { data, status } = await get(`/room/${id}`, token);
      if (status !== 200) {
        return toast.error(data.message);
      }
      setRoom(data[0]);
      $videoPlayer.current.src =
        data[0].link === "/NEON_arrow_aqua_orange_color.mp4" ? Video2 : Video;
      return;
    } catch (error) {
      return toast.error(error.message);
    }
  }

  async function changeVideo(videoId) {
    try {
      const { data, status } = await patch(
        "/room",
        { id, video_id: videoId },
        token
      );

      if (status !== 201) {
        return toast.error(data.message);
      }
      $videoPlayer.current.src = videoId === 2 ? Video2 : Video;
      restartVideo();
      return navigate(`/room/${id}`);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  async function loadingListVideo() {
    try {
      const { data, status } = await get("/videos", token);
      if (status !== 200) {
        return toast.error(data.message);
      }
      setVideos(data);
      return;
    } catch (error) {
      return toast.error(error.message);
    }
  }

  useEffect(() => {
    loadingRoomInfos();
    loadingListVideo();
  }, [openModalLogin]);
  return (
    <>
      <Header />
      <ModalLogin />
      <article className="ContainerRoom">
        <section className="DescriptionSection">{room.name}</section>
        <section className="VideoPlayer">
          <video
            ref={$videoPlayer}
            src={Video}
            onTimeUpdate={() => {
              handleTimeUpdate();
            }}
          />
          <div className="Controls">
            <button type="button" onClick={toggleVideoPlay}>
              {playerState.playing ? "Pause" : "Play"}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={playerState.currentPercentage}
              onChange={handleVideoChangePercentage}
            />
          </div>
        </section>
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => changeVideo(video.id)}
          >
            {video.name}
          </button>
        ))}
      </article>
    </>
  );
}
