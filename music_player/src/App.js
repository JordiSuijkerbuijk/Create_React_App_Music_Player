import React from 'react';
import './App.css';

//imports
import MusicPlayer from './components/musicPlayer/musicPlayer';
import StackedCards from './components/stackedcards/StackedCards';
import SpacingComponent from './components/spacingComponent/SpacingComponent';

function App() {
  return (
    <div className="App">
      {/* <MusicPlayer /> */}
      <SpacingComponent />
      <StackedCards />
      <SpacingComponent />
    </div>
  );
}

export default App;
