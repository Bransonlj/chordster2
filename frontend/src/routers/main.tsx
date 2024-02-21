import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SongList from '../pages/SongList'
import CreateSong from '../pages/CreateSong'
export default function MainRouter() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={ <SongList /> } />
        <Route path='create' element={ <CreateSong /> } />
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}
