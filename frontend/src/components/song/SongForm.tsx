import React, { useEffect, useState } from 'react'
import styles from './index.module.css';
import SongService from '../../services/songService/songService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Song } from '../../interfaces/songService/song/object';
import { ServiceResponse } from '../../interfaces/serviceResponse';

interface SongFormProps {
  song?:Song
}

export default function SongForm({ song }: SongFormProps) {

  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function loadSong(song: Song) {
    setTitle(song.title);
    setArtist(song.artist);
    setBody(song.body);
  }

  async function handleSubmit() {
    setError("");
    setIsloading(true);
    if (!currentUser) {
      console.log("Must be logged in");
      setError("Must be logged in");
    } else {
      let result: ServiceResponse<Song>;
      if (song) {
        result = await SongService.update({
          title,
          artist,
          body
        }, song.id, currentUser);
      } else {
        result = await SongService.create({
          title,
          artist,
          body
        }, currentUser);
      }

      if (result.success && result.data) {
        alert(`Song successfully ${song ? "updated" : "created"}!`);
        navigate(`/song/${result.data.id}`);
      } else {
        setError(result.errors.join());
      }
    }

    setIsloading(false);
  }

  useEffect(() => {
    if (song) {
      loadSong(song);
    }
  }, [song]);

  return (
    <div>
      <label>Title</label>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder='Song Title' />
      <label>Artist</label>
      <input 
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder='Artist'></input>
      <textarea 
        className={styles.bodyInput}
        placeholder='Enter song here'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={10}
        cols={100}
      />
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        >{song ? "Update" : "Create"}
      </button>
      {
        error && <span>{error}</span>
      }
      <h2>Preview</h2>
      <p className={styles.preview}>{body}</p>
    </div>
  )
}
