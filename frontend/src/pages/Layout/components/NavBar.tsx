import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {currentUser && <button onClick={logout}>logout</button>}
      {!currentUser && 
        <div>
          <button onClick={() => navigate("/login")}>login</button>
          <button onClick={() => navigate("/register")}>register</button>
        </div>
      }
    </div>
  )
}
