import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';

import soundFile from '../../public/songs/Kendrick_Lamar-Money_Trees.mp3';

import Controls from '../controls/Controls';
import Slider from '../slider/Slider';

import './musicplayer.scss';

// const audioFile = new Audio(soundFile);

//data that has to come from the soundFile / medialibrary which is coming soon.
const songTitle = 'Money Trees';
const songArtist = 'Kendrick Lamar';

function MusicPlayer() {
  const songTitleRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioFile = useRef(new Audio(soundFile));

  function audioFileAvailable() {
    setCanPlay(true);
  }

  function togglePlaying() {
    const functionName = isPlaying ? 'pause' : 'play';
    audioFile.current[functionName]();
    setIsPlaying(isPlaying === false);
  }

  useEffect(() => {
    audioFile.current.addEventListener('canplaythrough', audioFileAvailable);
    return function cleanup() {
      audioFile.current.removeEventListener('canplaythrough', audioFileAvailable);
    };
  }, []);

  function titleAnimationOnHover() {
    const duration = 5000;
    anime({
      targets: songTitleRef.current,
      translateX: '-100%',
      duration,
      easing: 'linear',
      complete: () =>
        anime({
          targets: songTitleRef.current,
          translateX: ['100%', '0%'],
          duration,
          easing: 'linear',
        }),
    });
  }

  return (
    <div className="musicPlayerBlock">
      {/* Image */}
      <img
        className="musicPlayerImage"
        src="https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />

      {/* Play button */}
      <div className="container">
        {/* Song Title */}
        <div className="musicPlayerTitleContainer">
          <div className="musicPlayerSongTitle" onMouseOver={titleAnimationOnHover}>
            <span ref={songTitleRef}>
              {songTitle} - {songArtist}
            </span>
          </div>
        </div>

        {canPlay && (
          <Controls audio={audioFile.current} togglePlaying={togglePlaying} isPlaying={isPlaying} />
        )}
      </div>

      {/* Range Slider */}
      {canPlay && <Slider audio={audioFile.current} isPlaying={isPlaying} />}
      
    </div>
  );
}

export default MusicPlayer;
