import React from 'react';
import './App.css';

//imports
import MusicPlayer from './components/musicPlayer/musicPlayer';
import StackedCards from './components/stackedcards/StackedCards';

function App() {
  return (
    <div className="App">
      <MusicPlayer />
      <StackedCards />
    </div>
  );
}

export default App;
