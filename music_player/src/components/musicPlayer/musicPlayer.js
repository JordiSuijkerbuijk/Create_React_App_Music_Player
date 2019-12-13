import React, { useState } from "react";
import soundFile from "../../public/songs/Kendrick_Lamar-Money_Trees.mp3";

import Controls from "../controls/Controls";
import Slider from "../slider/Slider";

import "./musicplayer.scss";

var audioFile = new Audio(soundFile);

//data that has to come from the soundFile / medialibrary which is coming soon.
const songTitle = "Money Trees";
const songArtist = "Kendrick Lamar";

function MusicPlayer() {
  const selectedSong = "Kendrick_Lamar-Money_Trees.mp3";
  const audioSource = "../../public/songs/" + selectedSong;

  //check if audio is playing
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="musicPlayerBlock">
      {/* Image */}
      <img
        className="musicPlayerImage"
        src="https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />

      {/* Range Slider */}
      <Slider audio={soundFile} isPlaying={isPlaying} />

      {/* Play button */}
      <div className="container">
        {/* Song Title */}
        <div className="musicPlayerTitleContainer">
          <div
            className="musicPlayerSongTitle"
            // onMouseOver={titleAnimationOnHover}
          >
            <marquee id="marquee">
              {songTitle} - {songArtist}
            </marquee>
          </div>
        </div>

        <Controls selectedSong={soundFile} isPlaying={setIsPlaying} />
      </div>
    </div>
  );
}

export default MusicPlayer;
