import React from 'react'

export default function CreateSong() {
  return (
    <div>
      <label>Title</label>
      <input placeholder='Song Title'></input>
      <label>Artist</label>
      <input placeholder='Artist'></input>
      <textarea 
        placeholder='Enter song here'
        rows={10}
        cols={100}
      />
    </div>
  )
}
