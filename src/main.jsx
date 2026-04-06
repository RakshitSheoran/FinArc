// Clear stale persisted state once per browser session
if (!sessionStorage.getItem('_fintrack_v3')) {
  localStorage.removeItem('fintrack-storage')
  sessionStorage.setItem('_fintrack_v3', '1')
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
