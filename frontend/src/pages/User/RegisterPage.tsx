import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register, registerError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function onRegister() {
    setLoading(true);
    const isSuccess = await register({username, email, password});
    setLoading(false);
    if (isSuccess) {
      navigate("/user/login");
    }
  }

  return (
    <div>
      <label>Email</label>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
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
      <button onClick={onRegister} disabled={loading}>Register</button>
      {
        registerError && <span>{registerError}</span>
      }
  </div>
  )
}
