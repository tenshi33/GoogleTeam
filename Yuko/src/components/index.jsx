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
                    <img className='first-dev-pic' src='#'/>
                    <p>First Dev Name</p>
                    <p>First Dev Infos</p>
                </div>
                <div className='second-dev'>
                    <img className='second-dev-pic' src='#'/>
                    <p>Second Dev Name</p>
                    <p>Second Dev Infos</p>
                </div>
                <div className='third-dev'>
                    <img className='third-dev-pic' src='#'/>
                    <p>Third Dev Name</p>
                    <p>Third Dev Infos</p>
                </div>
                <div className='fourth-dev'>
                    <img className='fourth-dev-pic' src='#'/>
                    <p>Fourth Dev Name</p>
                    <p>Fourth Dev Infos</p>
                </div>
                <div className='fifth-dev'>
                    <img className='fifth-dev-pic' src='#'/>
                    <p>Fifth Dev Name</p>
                    <p>Fifth Dev Infos</p>
                </div>
                <div className='sixth-dev'>
                    <img className='sixth-dev-pic' src='#'/>
                    <p>Sixth Dev Name</p>
                    <p>Sixth Dev Infos</p>
                </div>
            </section>

            <section id='services'>
                <h1>OUR SERVICES</h1>
                <div className='first-service'>
                    <p>service description</p>
                    <img className='first-service-pic'/>
                </div>
                <div className='second-service'>
                    <p>service description</p>
                    <img className='second-service-pic'/>
                </div>
                <div className='third-service'>
                    <p>service description</p>
                    <img className='third-service-pic'/>
                </div>
                <div className='fourth-service'>
                    <p>service description</p>
                    <img className='fourth-service-pic'/>
                </div>
            </section>

            <section id='contacts'>
                <img className='footer-yuko-logo' src='#'/>
                <div className='footer-other-pages'>
                    <p>Other pages</p>
                    <p>Home</p>
                    <p>Features</p>
                    <p>Developers</p>
                    <p>Services</p>
                    <p>Contacts</p>
                </div>
                
                <div className='footer-contacts'>
                    <p>Contacts</p>
                    <a href='#'>Email</a>
                    <a href='#'>Facebook</a>
                    <a href='#'>LinkedIn</a>
                    <a href='#'>Phone Number</a>
                </div>
                
            </section>
        </>
    )
}

export default Landing;