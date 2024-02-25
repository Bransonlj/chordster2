import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from './SearchBar';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/song">All songs</NavLink>
        <NavLink to="/song/create">Add songs</NavLink>
      </nav>
      <SearchBar />
      {currentUser && <button onClick={handleLogout}>logout</button>}
      {!currentUser && 
        <nav>
            <NavLink to="/user/login">login</NavLink>
            <NavLink to="/user/register">register</NavLink>
        </nav>
      }
    </div>
  )
}
