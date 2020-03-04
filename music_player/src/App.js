import React from 'react';
import './App.css';

//imports
import MusicPlayer from './components/musicPlayer/MusicPlayer';
import SliderTest from './components/sliderContainer/SliderContainer';

function App() {
  return (
    <div className="App">
      <MusicPlayer />
      <SliderTest />
    </div>
  );
}

export default App;
