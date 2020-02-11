import React, { useState, useEffect, useCallback, useRef } from 'react';
import dlv from 'dlv';

import './slider.scss';

function calculateAudioDuration(duration) {
  const minutes = parseInt(duration / 60, 10);
  const seconds = parseInt(duration % 60);
  duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  duration.toString();

  return duration;
}

function Slider({ audio, isPlaying }) {
  const [currentTime, setCurrentTime] = useState(0);
  const audioDuration = calculateAudioDuration(audio.duration);
  const animationFrame = useRef(null);

  useEffect(() => {
    if (isPlaying) draw();

    return function cleanup() {
      window.cancelAnimationFrame(animationFrame.current);
    };
  }, [isPlaying]);

  function draw() {
    setCurrentTime(calculateAudioDuration(audio.currentTime));
    animationFrame.current = window.requestAnimationFrame(draw);
  }

  return (
    <div className="sliderContainer">
      <div className="musicPlayerSlider">
        <div className="musicPlayerSliderTime">
          <p>{audioDuration}</p>
        </div>
        <div className="musicPlayerSliderCurrentTime">
          <p>{currentTime}</p>
          <span id="duration"></span>
        </div>
        <div className="musicPlayerSliderTimeIndicator" id="musicPlayerSliderTimeIndicator" />
      </div>
    </div>
  );
}

export default Slider;
