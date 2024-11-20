import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {
    return (
        <>
            <div className='landing-header'>
                <img className='header-yuko-logo' src='#' alt='Yuko Logo'/>
                <a>Home</a>
                <p className='header-dividers'>|</p>
                <a>Features</a>
                <p className='header-divider'>|</p>
                <a>Developers</a>
                <p className='header-divider'>|</p>
                <a>Our Services</a>
                <p className='header-divider'>|</p>
                <a>Contacts</a>
            </div>
        
            <h1>Landing</h1>
            <Link to="/Login" className="log-in-button">Log In</Link>
            <div className='Header'></div>
        </>
    )
}

export default Landing;