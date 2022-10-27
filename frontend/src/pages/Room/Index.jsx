/* eslint-disable jsx-a11y/media-has-caption */

import { useEffect, useRef } from "react";
import usePlayerState from "../../hooks/usePlayerState";

import Header from "../../components/Header/Index";
import ModalLogin from "../../components/ModalLogin/Index";
import useUser from "../../hooks/useUser";
import Video from "../../assets/videos/ICON_VERSION8_1.mp4";
import Video2 from "../../assets/videos/NEON_arrow_aqua_orange_color.mp4";

import "./styles.css";

export default function Room() {
  const { toggleModalRoom, toggleModalLogin } = useUser();
  const $videoPlayer = useRef(null);
  const {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleVideoChangePercentage,
    restartVideo,
  } = usePlayerState($videoPlayer);

  const video1 = `http://localhost:3000${Video}`;

  const login = false;

  function click() {
    if (login) {
      toggleModalRoom();
    } else {
      toggleModalLogin();
    }
  }

  function changeVideo() {
    if ($videoPlayer.current.src === video1) {
      $videoPlayer.current.src = Video2;
    } else {
      $videoPlayer.current.src = Video;
    }
    restartVideo();
  }

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <ModalLogin />
      <article className="ContainerHome">
        <section className="DescriptionSection">Essa é a sala X</section>
        <section className="LoginSection">
          <p className="LoginSectionText">
            Já está logado? então vamos lá e crie sua sala para poder
            compartilhar com os amigos
          </p>
          {login ? (
            <button type="button" onClick={() => click()}>
              Clique aqui
            </button>
          ) : (
            <button type="button" onClick={() => click()}>
              Faça o login
            </button>
          )}
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
              <button type="button" onClick={changeVideo}>
                Mudar Vídeo
              </button>
            </div>
          </section>
        </section>
      </article>
    </>
  );
}
