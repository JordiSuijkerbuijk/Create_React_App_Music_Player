import React from "react";
import soundFile from "../../public/songs/Kendrick_Lamar-Money_Trees.mp3";

import "./musicplayer.scss";

var audioFile = new Audio(soundFile);
console.log(audioFile);

/* make play and pause function into 1 function that does both */
function startAudio() {
  var playElement = document.getElementById("musicPlayerPlayButton");
  var pauseElement = document.getElementById("musicPlayerPauseButton");

  audioFile.play();

  playElement.classList += "hide";
  pauseElement.classList = "musicPlayerPauseButton";
}

function pauseAudio() {
  var pauseElement = document.getElementById("musicPlayerPauseButton");
  var playElement = document.getElementById("musicPlayerPlayButton");

  audioFile.pause();

  pauseElement.classList += "hide";
  playElement.classList = "musicPlayerPlayButton";
}

function musicPlayer() {
  const selectedSong = "Kendrick_Lamar-Money_Trees.mp3";
  const audioSource = "../../public/songs/" + selectedSong;

  return (
    <div className="musicPlayerBlock">
      {/* Image */}
      <img
        className="musicPlayerImage"
        src="https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />

      {/* Range Slider */}
      <div className="musicPlayerSlider">
        <div className="musicPlayerSliderTime">
          <p>4:30</p>
        </div>
        <div className="musicPlayerSliderCurrentTime">
          <p>0:00</p>
        </div>
        <div
          className="musicPlayerSliderTimeIndicator"
          id="musicPlayerSliderTimeIndicator"
        />
      </div>

      {/* Play button */}
      <div
        className="musicPlayerPlayButton"
        id="musicPlayerPlayButton"
        onClick={startAudio}
      >
        <audio id="audio" src={soundFile} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
          <polygon
            className="play-btn__svg"
            points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"
          />
          <path
            className="play-btn__svg"
            d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"
          />
        </svg>
      </div>
      <div
        className="musicPlayerPauseButtonhide"
        id="musicPlayerPauseButton"
        onClick={pauseAudio}
      >
        <audio id="audio" src={soundFile} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
          <polygon
            className="play-btn__svg"
            points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"
          />
          <path
            className="play-btn__svg"
            d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"
          />
        </svg>
      </div>

      {/* Song Title */}
      <div className="musicPlayerSongTitle">Song Title</div>
    </div>
  );
}

export default musicPlayer;
