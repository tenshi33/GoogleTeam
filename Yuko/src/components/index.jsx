import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {
    return (
        <>
            <div className='landing-header'>
                <img className='header-yuko-logo' src='#' alt='Yuko Logo'/>
                <a className='header-home' href='#'>Home</a>
                <p className='header-divider'>|</p>
                <a className='header-features' href='#'>Features</a>
                <p className='header-divider'>|</p>
                <a className='header-developers' href='#'>Developers</a>
                <p className='header-divider'>|</p>
                <a className='header-services' href='#'>Our Services</a>
                <p className='header-divider'>|</p>
                <a className='header-contacts' href='#'>Contacts</a>
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
                <div className='first-dev'>
                    <p>First Dev Name</p>
                    <p>First Dev Infos</p>
                </div>
                <div className='second-dev'>
                    <p>Second Dev Name</p>
                    <p>Second Dev Infos</p>
                </div>
                <div className='third-dev'>
                    <p>Third Dev Name</p>
                    <p>Third Dev Infos</p>
                </div>
                <div className='fourth-dev'>
                    <p>Fourth Dev Name</p>
                    <p>Fourth Dev Infos</p>
                </div>
                <div className='fifth-dev'>
                    <p>Fifth Dev Name</p>
                    <p>Fifth Dev Infos</p>
                </div>
            
            </section>

            <section id='services'>
                <h1>OUR SERVICES</h1>
            </section>

            <section id='contacts'></section>
        </>
    )
}

export default Landing;