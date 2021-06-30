import React, { useState, useEffect } from 'react';
import config from dotenv

import './trackLibrary.scss';

function TrackLibrary() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [authCode, setAuthCode] = useState(null);
  const [trackUri, setTrackUri] = useState('');

  console.log('config', config);

  useEffect(() => {
    if (!(window.location.search && window.location.search.split('=')[1])) {
      const my_client_id = '1b192b9ab3b54b67bddb8df2fd29ca0e';
      const redirect_uri = 'http://localhost:3000/callback';
      var scopes = 'user-read-private user-read-email';
      window.location.replace(
        'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          my_client_id +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirect_uri)
      );
    }

    setAuthCode(window.location.search && window.location.search.split('=')[1]);
  }, []);

  useEffect(() => {
    if (authCode !== null && token === null) {
      const clientId = '1b192b9ab3b54b67bddb8df2fd29ca0e';
      const clientSecret = 'a63adf4bf3c347279b9fd30c2999da05';
      const redirect_uri = 'http://localhost:3000/callback';
      const grantType = 'authorization_code';
      // const scopes = 'user-read-playback-state'

      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: `grant_type=${grantType}&code=${authCode}&redirect_uri=${redirect_uri}`,
        headers: {
          Authorization: 'Basic ' + btoa(`${clientId}:${clientSecret}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setToken(data.access_token);
        });
    }
  }, [authCode]);

  useEffect(() => {
    document.querySelector('.search').addEventListener('input', getTrackList);

    if (token !== null) {
      getTrackList();
    }
  }, [token]);

  function getTrackList(q = '') {
    const value = q.target && q.target.value ? q.target.value : '';

    fetch(`https://api.spotify.com/v1/search?q=${value}&type=track`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.tracks && data.tracks.items && setTracks(data.tracks.items)
      });
  }

  // function getDevices() {
  //   fetch(`https://api.spotify.com/v1/me/player/devices`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // } 

function checkForPlayer() {
    if (window.Spotify !== null) {
      const player = new window.Spotify.Player({
        name: "Matt's Spotify Player",
        getOAuthToken: cb => { cb(token); },
      });
      // this.createEventHandlers();
  
      // finally, connect!
      player.connect();
    }
  }

  useEffect(() => {
    console.log(window.Player)
  }, []);

  // const play = ({
  //   spotify_uri,
  //   playerInstance: {
  //     _options: {
  //       getOAuthToken,
  //       id
  //     }
  //   }
  // }) => {
  //   getOAuthToken(token => {
  //     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify({ uris: [spotify_uri] }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //     });
  //   });
  // };
  
  // play({
  //   playerInstance: "Web Playback SDK Quick Start Player",
  //   spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
  // });




  return (
    <div className="trackLibrary">
      <div className="wrapper">
        <div className="searchWrapper">
          <input className="search" type="text" placeholder="Zoek naar nummers..." />
        </div>
        <div className="tracks">
          {tracks &&
            tracks.map((item, key) => (
              <div key={key} className="trackWrapper">
                <div className="image">
                  <img src={item.album.images[0].url} />
                </div>
                <div className="trackInfo" onClick={() => setTrackUri(item)}>
                  <div className="name">{item.name}</div>
                  <div className="artist">{item.artists[0].name}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TrackLibrary;
