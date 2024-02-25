import React, { useEffect, useState } from 'react'
import { SongMetaData } from '../../interfaces/songService/songMetaData'
import { getAllSongs } from '../../services/songService/songService';

export default function SongList() {

  const [songs, setSongs] = useState<SongMetaData[]>([]);

  async function loadSongs() {
    const res = await getAllSongs();
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
            <span>{song.title}</span>
            <span>{song.id}</span>
          </div>
        ))
      }
    </div>
  )
}
