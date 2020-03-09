import React from 'react';

import './controls.scss';

function Controls({ audio, togglePlaying, isPlaying }) {
  return (
    <div className="controlsWrapper">
      <div className="leftArrow">left</div>
      <div className="playButton" onClick={togglePlaying}>
        {isPlaying ? 'pause' : 'play'}
      </div>
      <div className="rightArrow">next</div>
    </div>
  );
}

export default Controls;
