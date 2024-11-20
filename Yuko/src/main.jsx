import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/index'
import Login from './components/Login';
import Register from './components/Register';
import Yuko from './components/Yuko';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/yuko" element={<Yuko />} />
      </Routes>
    </Router>
  </StrictMode>
);
