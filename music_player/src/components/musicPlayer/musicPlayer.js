import React, { useState, useRef, useEffect } from 'react';

// import anime from 'animejs';

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
  const [startPlayingAt, setStartPlayingAt] = useState(0);

  const audioFile = useRef(new Audio(soundFile));

  function audioFileAvailable() {
    setCanPlay(true);
  }

  function togglePlaying() {
    const functionName = isPlaying ? 'pause' : 'play';
    audioFile.current[functionName]();
    audioFile.current.currentTime = startPlayingAt;
    audioFile.current.volume = 0.1;

    volumeFade(audioFile.current);
    setIsPlaying(isPlaying === false);
  }

  function volumeFade(audio) {
    const fade = setInterval(function() {
      if (audio.volume <= 0.9) {
        audio.volume += 0.1;
      } else {
        clearInterval(fade);
      }
    }, 200);
    // anime({
    //   translateX: 270,
    //   delay: 1000,
    //   direction: 'alternate',
    //   loop: 3,
    //   easing: 'easeInOutCirc',
    //   update: function(anim) {
    //     updates++;
    //     progressLogEl.value = 'progress : '+Math.round(anim.progress)+'%';
    //     updateLogEl.value = 'updates : '+updates;
    //   }
    // });
  }

  useEffect(() => {
    audioFile.current.addEventListener('canplaythrough', audioFileAvailable);
    return function cleanup() {
      audioFile.current.removeEventListener('canplaythrough', audioFileAvailable);
    };
  }, []);

  useEffect(() => {
    audioFile.current.currentTime = startPlayingAt;
  }, [startPlayingAt])

  return (
    <div className="musicPlayerBlock">
      {/* Image */}
      <img
        className="musicPlayerImage"
        src="https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />

      {/* Play button */}
      <div className="controlsContainer">
        {/* Song Title */}
        <div className="musicPlayerTitleContainer">
          <div className="musicPlayerSongTitle">
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
      {canPlay && (
        <Slider
          audio={audioFile.current}
          isPlaying={isPlaying}
          setStartPlayingAt={setStartPlayingAt}
        />
      )}
    </div>
  );
}

export default MusicPlayer;
