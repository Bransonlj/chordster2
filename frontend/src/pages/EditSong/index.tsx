import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import SongService from '../../services/songService/songService';
import { useParams } from 'react-router-dom';
import { Song } from '../../interfaces/songService/song/object';
import SongForm from '../../components/song/SongForm';

export default function EditSong() {

  const [song, setSong] = useState<Song>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { id } = useParams();

  async function fetchSong() {
    setError("");
    if (!id) {
      setError("Empty id");
      return
    }
    const result = await SongService.findById(id)
    if (!result.success || !result.data) {
      setError(result.errors.join());
      return;
    }
    if (result.data.authorId !== currentUser?.user_id) {
      setError("Unauthorized, must be Author to edit.");
      return;
    }
    setSong(result.data);
    return;
  }

  useEffect(() => {
    setIsLoading(true);
    fetchSong();
    setIsLoading(false);
  }, [id])

  if (isLoading) return <h2>Loading</h2>

  if (error) return <h2>{error}</h2>

  return (
    <SongForm song={song}/>
  )
}
