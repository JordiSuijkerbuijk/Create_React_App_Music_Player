import React from 'react';
// import express from 'express';
// import dlv from 'dlv';

import './trackLibrary.scss';

function TrackLibrary() {
  // var express = require('express');
  const authCode = window.location.search && window.location.search.split('=')[1];
  // var app = express();

  function getTrackList() {
    console.log('authCode', authCode);

    fetch(
      'https://api.spotify.com/v1/search?q=both&type=track',
      // { q: 'Both', type: 'track' },
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authCode}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  getTrackList();

  function test() {
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

  return (
    <div className="trackLibrary" onClick={() => test()}>
      <div className="wrapper">
        <div className="search"></div>
        <div className="tracksWrapper"></div>
      </div>
    </div>
  );
}

export default TrackLibrary;
