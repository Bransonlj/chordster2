import React from 'react'
import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom'
import SongList from '../pages/SongList'
import CreateSong from '../pages/CreateSong'
import LoginPage from '../pages/UserPages/LoginPage'
import Layout from '../pages/Layout'
import RegisterPage from '../pages/UserPages/RegisterPage'
import { UserAuthentication } from '../interfaces/userService/userAuthentication'
import { useAuth } from '../context/AuthContext'
import HomePage from '../pages/HomePage'
import SongPage from '../pages/SongPage'
import EditSong from '../pages/EditSong'

function ProtectedRoute({ user }: {user: UserAuthentication | null}) {
  return user ? <Outlet /> : <Navigate to="/user/login" replace={true} />;
}

function PostLoginNoAccessRoute({ user }: {user: UserAuthentication | null}) {
  return user ? <Navigate to="/" replace={true} /> : <Outlet />;
}

export default function MainRouter() {

  const {currentUser} = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route element={ <Layout /> }>
          <Route index element={ <HomePage /> } />
          <Route path='song'>
              <Route 
                index 
                element={ <SongList /> } 
              />
              <Route 
                path=':id' 
                element={ <SongPage /> }
              />
              <Route element={ <ProtectedRoute user={currentUser} /> }>
                <Route 
                  path='create' 
                  element={ <CreateSong /> } 
                />
                <Route 
                  path='edit/:id' 
                  element={ <EditSong /> } 
                />
              </Route>
            </Route>
        </Route>
        <Route path='user'>
          <Route element={ <PostLoginNoAccessRoute user={currentUser} /> } >
            <Route 
              path='login' 
              element={ <LoginPage /> } 
            />
            <Route 
              path='register' 
              element={ <RegisterPage /> }
            />
          </Route>
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}
