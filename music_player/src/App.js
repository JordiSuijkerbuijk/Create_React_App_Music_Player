import React from 'react';
import './App.css';

//imports
import MusicPlayer from './components/musicPlayer/MusicPlayer';
import TrackLibrary from './components/trackLibrary/TrackLibrary';

function App() {
  return (
    <div className="App">
      <TrackLibrary />
      <MusicPlayer />
    </div>
  );
}

export default App;
