import React, { useEffect, useState } from 'react'
import { Song } from '../../interfaces/songService/song/object'
import { useNavigate, useParams } from 'react-router-dom';
import SongService from '../../services/songService/songService';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

export default function SongPage() {

  const [song, setSong] = useState<Song>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { id } = useParams();
  const navigate= useNavigate();

  async function fetchSong(id: string) {
    const result = await SongService.findById(id)
    if (result.success && result.data) {
      setSong(result.data);
    } else {
      setError(result.errors.join());
    }
  }

  async function handleDelete() {
    if (id && currentUser) {
      if (confirm("delete song?")) {
        const result = await SongService.delete(id, currentUser);
        if (result.success) {
          alert("successfully deleted")
          navigate("/song");
        } else {
          alert(`Error deleting song: ${result.errors.join()}`);
        }
      }
    }
  }

  useEffect(() => {
    setIsLoading(true);
    setError("");
    if (id) {
      fetchSong(id);
    } else {
      setError("Empty id");
    }
    setIsLoading(false);
  }, [id])

  if (isLoading) return <h2>Loading</h2>

  if (error) return <h2>{error}</h2>

  return (
    <div>
      <span>title: {song?.title}</span>
      <span>artist: {song?.artist}</span>
      <p>{song?.body}</p>
      <NavLink to={`/song/edit/${song?.id}`}>Edit</NavLink>
      {
        song?.authorId === currentUser?.user_id && <div>
          <button onClick={handleDelete}>Delete</button>
          <NavLink to={`/song/edit/${song?.id}`}>Edit</NavLink>
        </div>
      }
    </div>
  )
}
