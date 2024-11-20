import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {
    return (
        <>
            <div className='landing-header'>
                <img className='header-yuko-logo' src='#' alt='Yuko Logo'/>
                <a className='header-home'>Home</a>
                <p className='header-dividers'>|</p>
                <a className='header-features'>Features</a>
                <p className='header-divider'>|</p>
                <a className='header-developers'>Developers</a>
                <p className='header-divider'>|</p>
                <a className='header-services'>Our Services</a>
                <p className='header-divider'>|</p>
                <a className='header-contacts'>Contacts</a>
            </div>

            <section id='home'>
                <h1 className='home-yuko-title'>Yuko</h1>
                <p className='home-yuko-description'>Decription</p>
                <Link to="/Login" className="log-in-button">Log In</Link>
            </section>

            <section id='features'>
                <div className='features-first-section'>
                    <h1>FEATURES</h1>
                    <p>Some Description</p>
                </div>
                <div className='features-scroll-section'>
                    <div className='first-feature'>
                        <p>First Description Title</p>
                        <p>First Feature Description</p>
                    </div>
                </div>
            </section>

            <section id='developers'>
                <h1>DEVELOPERS</h1>
            </section>

            <section id='services'></section>

            <section id='contacts'></section>
        </>
    )
}

export default Landing;