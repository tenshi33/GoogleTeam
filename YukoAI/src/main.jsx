import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LogInDesktop from './components/LogInDesktop'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LogInDesktop />
  </StrictMode>,
)
