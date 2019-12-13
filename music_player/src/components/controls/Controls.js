import React, { useState } from "react";

import "./controls.scss";

function Controls(props) {
  const audioFile = new Audio(props.selectedSong);

  const startAudio = () => {
    const element = document.querySelector(".playButton");

    if (element !== undefined) {
      if (!audioFile.paused) {
        element.classList.add("pause");
        audioFile.pause();
        props.isPlaying(false);
      } else {
        element.classList.remove("pause");
        audioFile.play();
        props.isPlaying(true);
      }
    }
  };

  return (
    <div className="controlsContainer">
      <div className="leftArrow">left</div>
      <div className="playButton" onClick={startAudio}>
        play
      </div>
      <div className="rightArrow">next</div>
    </div>
  );
}

export default Controls;
