import React, { ReactNode } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom'
import SongList from '../pages/SongList'
import CreateSong from '../pages/CreateSong'
import LoginPage from '../pages/UserPages/LoginPage'
import Layout from '../pages/Layout'
import RegisterPage from '../pages/UserPages/RegisterPage'
import { UserAuthentication } from '../interfaces/userService/userAuthentication'
import { useAuth } from '../context/AuthContext'

function PostLoginNoAccessRoute({ user, children }: {user: UserAuthentication | null, children: ReactNode}) {
  const navigate = useNavigate();

  if (user) {
    console.log("PostLoginNoAccessRoute: You are not allowed to view this page after signing in.")
    navigate("/");
    window.location.reload();
  }
  // TODO this is causing the children page to still display after navigating but before the page is reloaded.
  return children;
}

export default function MainRouter() {

  const {currentUser} = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={ <Layout /> }>
        <Route 
          path='login' 
          element={ 
            <PostLoginNoAccessRoute user={currentUser}>
              <LoginPage /> 
            </PostLoginNoAccessRoute>
          } 
        />
        <Route 
          path='register' 
          element={ 
            <PostLoginNoAccessRoute user={currentUser}>
              <RegisterPage />
            </PostLoginNoAccessRoute>
          } 
        />
        <Route index element={ <SongList /> } />
        <Route path='create' element={ <CreateSong /> } />
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}
