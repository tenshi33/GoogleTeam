import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {
    return (
        <>
        <h1>Landing</h1>
        <Link to="/Login" className="log-in-button">Log In</Link>
        </>
    )
}

export default Landing;