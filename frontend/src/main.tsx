import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CreateSong from './pages/CreateSong'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
