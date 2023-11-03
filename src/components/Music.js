import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CurrentlyPlaying } from './CurrentlyPlaying';

export const Music = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const LAST_FM_API_KEY = process.env.REACT_APP_LAST_FM_API_KEY;
  const username = 'pranshu05';

  useEffect(() => {
    const fetchLastFmTopTracks = async () => {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&api_key=${LAST_FM_API_KEY}&format=json&limit=10`
      );
      setTopTracks(response.data.toptracks.track);
    };

    const fetchLastFmTopArtists = async () => {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&api_key=${LAST_FM_API_KEY}&format=json&limit=10`
      );
      setTopArtists(response.data.topartists.artist);
    };

    const fetchLastFmRecentlyPlayed = async () => {
      const response = await axios.get(
        `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${LAST_FM_API_KEY}&format=json&limit=10`
      );
      setRecentlyPlayed(response.data.recenttracks.track);
    };

    fetchLastFmTopTracks();
    fetchLastFmTopArtists();
    fetchLastFmRecentlyPlayed();
  });

  const getTimeAgo = (timestamp) => {
    const secondsAgo = Math.floor((new Date() - new Date(timestamp * 1000)) / 1000);
    if (secondsAgo < 60) {
      return `${secondsAgo} s ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} m ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} h ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} d ago`;
    }
  };

  if ( recentlyPlayed.length === 0 || topArtists.length === 0 | topTracks.length === 0 ){
   return (
      <div className="music">
         <h1>Listening Activity</h1>
         <small style={{ color: '#818181' }}>My music listening activity 👀, updated in real-time.</small>
            <CurrentlyPlaying />
            <div style={{ width: '100%', height: '100px' }}>
               <div className="gradient" />
            </div>
            <div style={{ width: '100%', height: '100px' }}>
               <div className="gradient" />
            </div>
            <div style={{ width: '100%', height: '100px' }}>
               <div className="gradient" />
            </div>
      </div>
   )
}

  return (
    <div className="music">
      <h1>Listening Activity</h1>
      <small style={{ color: '#818181' }}>My music listening activity 👀, updated in real-time.</small>
      <CurrentlyPlaying />
      <div className="recently-played-cont">
        <h2>Recently Played</h2>
        {recentlyPlayed.map((track) => (
          <a
            key={track.date ? track.date.uts : null} 
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="track link"
          >
            <div className="recently-played-div">
              <div className="recently-played-text">
                {track.name}
                <br />
                <small>{track.artist['#text']}</small>
              </div>
              <div className="recently-played-time">
                <small>{track.date ? getTimeAgo(track.date.uts) : 'Currently Playing'} 
                </small>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="top-tracks-cont">
        <h2>Top Tracks</h2>
        <small style={{ color: '#818181' }}>All time stats.</small>
        {topTracks.map((track) => (
          <a
            key={track.name}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="track url"
          >
            <div className="top-tracks-div">
              <div className="top-tracks-text">
                {track.name}
                <br />
                <small>{track.artist.name}</small>
              </div>
              <div className="top-tracks-plays">
                <small>{track.playcount} plays</small>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="top-artists-cont">
        <h2>Top Artists</h2>
        <small style={{ color: '#818181' }}>All time stats.</small>
        {topArtists.map((artist) => (
          <a
            key={artist.name}
            href={artist.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="artist url"
          >
            <div className="top-artists-div">
              <div className="top-artists-text">{artist.name}</div>
              <div className="top-artists-plays">
                <small>{artist.playcount} plays</small>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
