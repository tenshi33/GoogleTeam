import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LogInDesktop from './components/login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogInDesktop />
  </StrictMode>,
)
