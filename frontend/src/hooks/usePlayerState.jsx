/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
import { useEffect, useState } from "react";

function usePlayerState(videoPlayer) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    currentPercentage: 0,
  });

  useEffect(() => {
    if (playerState.playing) {
      videoPlayer.current.play();
    } else {
      videoPlayer.current.pause();
    }
  }, [playerState.playing, videoPlayer]);

  function toggleVideoPlay() {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  }

  function restartVideo() {
    setPlayerState({
      ...playerState,
      playing: false,
      currentPercentage: 0,
    });
  }

  function handleTimeUpdate() {
    // prettier-ignore
    const percentage = (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100;
    if (percentage === 100) {
      restartVideo();
    } else {
      setPlayerState({
        ...playerState,
        currentPercentage: percentage,
      });
    }
  }
  function handleVideoChangePercentage(event) {
    // prettier-ignore
    // eslint-disable-next-line no-param-reassign
    videoPlayer.current.currentTime = (event.target.value * videoPlayer.current.duration) / 100;
    setPlayerState({
      ...playerState,
      currentPercentage: event.target.value,
    });
  }

  return {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleVideoChangePercentage,
    restartVideo,
  };
}

export default usePlayerState;
