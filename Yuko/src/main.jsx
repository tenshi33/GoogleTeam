import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LogInDesktop from './components/LogInDesktop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogInDesktop />
  </StrictMode>,
)
