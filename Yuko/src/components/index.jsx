import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {
    return (
        <>
            <div className='landing-header'>
                <img className='header-yuko-logo' src='#' alt='Yuko Logo'/>
                <a>Home</a>
                <a>Features</a>
                <a>Developers</a>
                <a>Our Services</a>
                <a>Contacts</a>
            </div>
        
            <h1>Landing</h1>
            <Link to="/Login" className="log-in-button">Log In</Link>
            <div className='Header'></div>
        </>
    )
}

export default Landing;