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

function Slider({ audio, isPlaying, setStartPlayingAt }) {
  const [currentTime, setCurrentTime] = useState(0);
  const audioDuration = calculateAudioDuration(audio.duration);
  const animationFrame = useRef(null);

  const containerRef = useRef(null);
  const [currentX, setCurrentX] = useState(0);
  const sliderSize = 2;
  const sliderWidth = 240;

  useEffect(() => {
    containerRef.current.addEventListener('mousedown', dragStart, false);
    containerRef.current.addEventListener('mouseup', dragEnd, false);

    //timer functionality
    if (isPlaying) draw();

    return function cleanup() {
      window.cancelAnimationFrame(animationFrame.current);
    };
  }, [isPlaying]);

  function draw() {
    setCurrentTime(calculateAudioDuration(audio.currentTime));
    animationFrame.current = window.requestAnimationFrame(draw);
  }

  function dragStart(e) {
    if (e.type === 'mousedown') {
      containerRef.current.addEventListener('mousemove', drag, false);
    }
  }

  function drag(e) {
    if (e.type === 'mousemove') {
      const currentMousePosition = e.clientX - containerRef.current.offsetLeft - sliderSize / 2;
      const spreadedDuration = audio.duration / sliderWidth;
      const calculatedTime = spreadedDuration * currentMousePosition;
      const newCurrentTime = calculateAudioDuration(calculatedTime);

      setCurrentX(currentMousePosition);
      setCurrentTime(newCurrentTime);
      setStartPlayingAt(calculatedTime);
    }
  }

  function dragEnd(e) {
    if (e.type === 'mouseup') {
      setCurrentX(e.clientX - containerRef.current.offsetLeft - sliderSize / 2);
      containerRef.current.removeEventListener('mousemove', drag, false);
    }
  }

  return (
    <div className="sliderContainer" ref={containerRef}>
      <div className="musicPlayerSlider">
        <div className="timeIndicator" style={{ left: currentX }} />
      </div>
      <div className="musicPlayerSliderTime">
        <p className="currentTime">{currentTime}</p>
        <p className="totalTime">{audioDuration}</p>
      </div>
      {/* <div className="musicPlayerSliderCurrentTime">
          
          <span id="duration"></span>
        </div> */}
      <div className="musicPlayerSliderTimeIndicator" id="musicPlayerSliderTimeIndicator" />
    </div>
    // </div>
  );
}

export default Slider;
