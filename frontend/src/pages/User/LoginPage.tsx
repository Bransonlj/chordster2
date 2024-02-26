import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { currentUser, login, loginError } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onLogin() {
    setLoading(true);
    const isSuccess = await login(username, password);
    setLoading(false);
    if (isSuccess) {
      navigate("/");
    } else {
      // reset inputs
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div>
      <label>Username</label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={onLogin} disabled={loading}>Login</button>
      {
        loginError && <span>{loginError}</span>
      }
    </div>
  )
}
