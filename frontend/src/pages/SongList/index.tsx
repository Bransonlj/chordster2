import React, { useEffect, useState } from 'react'
import { SongMetaData } from '../../interfaces/songService/songMetaData'
import SongService from '../../services/songService/songService';
import { NavLink } from 'react-router-dom';

export default function SongList() {

  const [songs, setSongs] = useState<SongMetaData[]>([]);

  async function loadSongs() {
    const res = await SongService.findAll();
    console.log(res);
    if (res && res.data) {
      setSongs(res.data.data)
    } else {
      console.log(res.errors);
    }
  }

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <div>
      {
        songs.map((song: SongMetaData) => (
          <div key={song.id}>
            <NavLink to={`/song/${song.id}`}>{song.title}</NavLink>
            <span>{song.artist}</span>
          </div>
        ))
      }
    </div>
  )
}
