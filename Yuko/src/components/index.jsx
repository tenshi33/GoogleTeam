import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {
    return (
        <>

            <div className='landing-page'>
                <div className='nav-bar-container'>
                    <img className='nav-yuko-logo' src='Yuko_logo_text.png' alt='Yuko Logo'/>
                    <ul className='nav-bar-menu'>
                        <li className='nav-home'>HOME</li>
                        <li className='nav-divider'>|</li>
                        <li className='nav-features'>FEATURES</li>
                        <li className='nav-divider'>|</li>
                        <li className='nav-developers'>DEVELOPERS</li>
                        <li className='nav-divider'>|</li>
                        <li className='nav-services'>OUR SERVICES</li>
                        <li className='nav-divider'>|</li>
                        <li className='nav-contacts'>CONTACTS</li>
                    </ul>
                </div>

                <section id='home' className='home-landing-section'>
                    <div className='home-landing'>
                        <img src='background.png' className='landing-background-img' alt='Background Image'/>
                        <div className='landing-home-content'>
                            <h1 className='home-yuko-title'>YUKO</h1>
                            <p className='home-yuko-description'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                            <div className='get-started-button'>
                                <Link to="/Login" className="log-in-button">Get Started</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section id='features' className='features-landing-section'>
                    <div className='features-landing'>
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
                    </div>
                    
                </section>

                <section id='developers' className='dev-landing-section'>
                    <div className='dev-landing'>
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
                    </div>
                </section>

                <section id='services' className='services-landing-section'>
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
            </div>
        </>
    )
}

export default Landing;