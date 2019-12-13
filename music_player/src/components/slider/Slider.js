import React, { useState, useEffect } from "react";

import dlv from "dlv";

import "./slider.scss";

function Slider(props) {
  const audio = dlv(props, "audio", "");
  const audioFile = new Audio(props.audio);
  const [audioLength, setAudioLength] = useState("null");

  const [audioTimer, setAudioTimer] = useState(0);

  function audioDuration(duration) {
    const minutes = parseInt(duration / 60, 10);
    const seconds = parseInt(duration % 60);
    duration = minutes + ":" + seconds;
    duration.toString();

    return duration;
  }

  useEffect(() => {
    audioFile.addEventListener("loadeddata", () => {
      const duration = audioDuration(audioFile.duration);
      setAudioLength(duration);
      // The duration variable now holds the duration (in seconds) of the audio clip
    });
  }, []);

  return (
    <div className="sliderContainer">
      <div className="musicPlayerSlider">
        <div className="musicPlayerSliderTime">
          <p>{audioLength}</p>
        </div>
        <div className="musicPlayerSliderCurrentTime">
          <p>
            {/* {setInterval(audioTimeCounter, 1000)}:{audioTimeCounterSeconds} */}
          </p>
          <span id="duration"></span>
        </div>
        <div
          className="musicPlayerSliderTimeIndicator"
          id="musicPlayerSliderTimeIndicator"
        />
      </div>
    </div>
  );
}

export default Slider;
