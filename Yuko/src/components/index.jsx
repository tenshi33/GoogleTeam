import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {
    return (
        <>
            <div className='landing-page'>
                {/*HEADER OF LANDING PAGE*/}
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

                {/*HOME SECTION IN LANDING PAGE*/}
                <section id='home' className='home-landing-section'>
                    <div className='home-landing'>
                        {/*BACKGROUND IMAGE OF LANDING PAGE*/}
                        <img src='background.png' className='landing-background-img' alt='Background Image'/>
                        {/*HOME SECTION CONTENTS*/}
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
                
                {/*FEATURES SECTION IN LANDING PAGE*/}
                <section id='features' className='features-landing-section'>
                    <div className='features-landing'>
                        {/*FEATURES TOP-LEFT SIDE*/}
                        <div className='features-top'>
                            <div className='features-first-section'>
                                <h1 className='feature-title'>FEATURES</h1>
                                <p className='features-top-left-decscription'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                            </div>
                            <div className='feature-section-divider'></div>
                            {/*FEATURES TOP-RIGHT SIDE WITH SCROLL FEATURE*/}
                            <div className='features-scroll-section'>
                                <div className='features'>
                                    <img src='https://placehold.co/168x113' alt='feature content picture'></img>
                                    <div className='first-feature-content'>
                                        <p className='features-title'>First Feature Title</p>
                                        <p className='features-description'>First Feature Description</p>
                                    </div>
                                </div>

                                <div className='features'>
                                    <img src='https://placehold.co/168x113' alt='feature content picture'></img>
                                    <div className='first-feature-content'>
                                        <p className='features-title'>Second Feature Title</p>
                                        <p className='features-description'>Second Feature Description</p>
                                    </div>
                                </div>

                                <div className='features'>
                                    <img src='https://placehold.co/168x113' alt='feature content picture'></img>
                                    <div className='first-feature-content'>
                                        <p className='features-title'>Third Feature Title</p>
                                        <p className='features-description'>Third Feature Description</p>
                                    </div>
                                </div>

                                <div className='features'>
                                    <img src='https://placehold.co/168x113' alt='feature content picture'></img>
                                    <div className='first-feature-content'>
                                        <p className='features-title'>Fourth Feature Title</p>
                                        <p className='features-description'>Fourth Feature Description</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='features-bottom'>
                            <img src='https://placehold.co/320x480' alt='chatbot' className='chatbot1'></img>
                            <img src='https://placehold.co/320x480' alt='chatbot' className='chatbot2'></img>
                        </div>
                    </div>
                </section>

                {/*DEVELOPERS SECTION IN LANDING PAGE*/}
                <section id='developers' className='dev-landing-section'>
                    <div className='dev-landing'>
                        {/*DEVELOPERS PAGE TITLE*/}
                        <h1 className='dev-title'>DEVELOPERS</h1>
                        {/*DEVELOPER 1 SHAPES CONTAINER*/}
                        <div className='first-dev-shape-outline'></div>
                        <div className='first-dev-shape-inside'></div>

                        {/*DEVELOPER 1 CONTENT*/}
                        <div className='first-dev'>
                            {/*DEVELOPER 1 PIC*/}
                            <img className='first-dev-pic' src='https://placehold.co/250x312' alt='first developer picture'/>
                            {/*DEVELOPER 1 INFOS*/}
                            <div className='first-dev-infos'>
                                <p className='first-dev-name'>Angelo Egwaras</p>
                                <p className='first-dev-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>

                        {/*DEVELOPER 2 SHAPES CONTAINER*/}
                        <div className='second-dev-shape-outline'></div>
                        <div className='second-dev-shape-inside'></div>

                        {/*DEVELOPER 2 CONTENT*/}
                        <div className='second-dev'>
                            {/*DEVELOPER 2 INFOS*/}
                            <div className='second-dev-infos'>
                                <p className='second-dev-name'>Yohan Caballero</p>
                                <p className='second-dev-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>

                            {/*DEVELOPER 2 PIC*/}
                            <img className='second-dev-pic' src='https://placehold.co/250x312' alt='second developer picture'/>
                        </div>

                        {/*DEVELOPER 3 SHAPES CONTAINER*/}
                        <div className='third-dev-shape-outline'></div>
                        <div className='third-dev-shape-inside'></div>

                        {/*DEVELOPER 3 CONTENT*/}
                        <div className='third-dev'>
                            {/*DEVELOPER 3 PIC*/}
                            <img className='third-dev-pic' src='https://placehold.co/250x312' alt='third developer picture'/>
                            {/*DEVELOPER 3 INFOS*/}
                            <div className='third-dev-infos'>
                                <p className='third-dev-name'>Adryan Antiporda</p>
                                <p className='third-dev-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>

                        {/*DEVELOPER 4 SHAPES CONTAINER*/}
                        <div className='fourth-dev-shape-outline'></div>
                        <div className='fourth-dev-shape-inside'></div>

                        {/*DEVELOPER 4 CONTENT*/}
                        <div className='fourth-dev'>
                            {/*DEVELOPER 4 INFOS*/}
                            <div className='fourth-dev-infos'>
                                <p className='fourth-dev-name'>Faith Calma</p>
                                <p className='fourth-dev-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>

                            {/*DEVELOPER 4 PIC*/}
                            <img className='fourth-dev-pic' src='https://placehold.co/250x312' alt='fourth developer picture'/>
                        </div>

                        {/*DEVELOPER 5 SHAPES CONTAINER*/}
                        <div className='fifth-dev-shape-outline'></div>
                        <div className='fifth-dev-shape-inside'></div>

                        {/*DEVELOPER 5 CONTENT*/}
                        <div className='fifth-dev'>
                            {/*DEVELOPER 5 PIC*/}
                            <img className='fifth-dev-pic' src='https://placehold.co/250x312' alt='third developer picture'/>
                            {/*DEVELOPER 5 INFOS*/}
                            <div className='fifth-dev-infos'>
                                <p className='fifth-dev-name'>Wadie Ibrahim Camaligan</p>
                                <p className='fifth-dev-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>
                        </div>


                        {/*DEVELOPER 6 SHAPES CONTAINER*/}
                        <div className='sixth-dev-shape-outline'></div>
                        <div className='sixth-dev-shape-inside'></div>

                        {/*DEVELOPER 6 CONTENT*/}
                        <div className='sixth-dev'>
                            {/*DEVELOPER 6 INFOS*/}
                            <div className='sixth-dev-infos'>
                                <p className='sixth-dev-name'>Ericka Gracelyn De Guzman</p>
                                <p className='sixth-dev-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                            </div>

                            {/*DEVELOPER 6 PIC*/}
                            <img className='sixth-dev-pic' src='https://placehold.co/250x312' alt='sixth developer picture'/>
                        </div>
                    </div>
                </section>

                {/*SERVICES SECTION IN LANDING PAGE*/}
                <section id='services' className='services-landing-section'>
                    <div className='services-scroll-section1'>
                        <div className='services'>
                            <img src='https://placehold.co/168x113' alt='services content picture' className=''></img>
                            <div className='first-service-content'>
                                <p className='service-title'>First Feature Title</p>
                                <p className='service-description'>First Feature Description</p>
                            </div>
                        </div>

                        <div className='services'>
                            <img src='https://placehold.co/168x113' alt='services content picture'></img>
                            <div className='first-service-content'>
                                <p className='service-title'>Second Feature Title</p>
                                <p className='service-description'>Second Feature Description</p>
                            </div>
                        </div>

                        <div className='services'>
                            <img src='https://placehold.co/168x113' alt='services content picture'></img>
                            <div className='first-service-content'>
                                <p className='service-title'>Third Feature Title</p>
                                <p className='service-description'>Third Feature Description</p>
                            </div>
                        </div>

                        <div className='services'>
                            <img src='https://placehold.co/168x113' alt='services content picture'></img>
                            <div className='first-service-content'>
                                <p className='service-title'>Fourth Feature Title</p>
                                <p className='service-description'>Fourth Feature Description</p>
                            </div>
                        </div>
                    </div>                
                    </section>

                <section id='contacts' className='contacts-landing-section'>
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