import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css'

function Landing() {

        const [sticky, setSticky] = useState(false);

        useEffect(()=>{
            window.addEventListener('scroll', ()=>{
                window.scrollY > 10 ? setSticky(true) : setSticky(false)
            })
        },[])

        // Creating refs for each section
    const homeRef = useRef(null);
    const featuresRef = useRef(null);
    const developersRef = useRef(null);
    const contactsRef = useRef(null);

    // Scroll function
    const scrollToSection = (sectionRef) => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    let date = new Date().getFullYear();

    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=mail" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=menu" />
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2565346911167424"
     crossorigin="anonymous"></script>
            <div className='landing-page'>
                {/*HEADER OF LANDING PAGE*/}
                <nav className={`nav-bar-container ${sticky? 'color-nav' : ''}`}>
                    <img className='nav-yuko-logo' src='Yuko_logo_text.png' alt='Yuko Logo'/>
                    
                        <ul className='nav-menu'>
                            <div className={isOpen ? "toogle-nav active" : "toggle-nav"}>
                                <li className='nav-home' onClick={() => scrollToSection(homeRef)}>HOME</li>
                                <li className='nav-divider'>|</li>
                                <li className='nav-features' onClick={() => scrollToSection(featuresRef)}>FEATURES</li>
                                <li className='nav-divider'>|</li>
                                <li className='nav-developers' onClick={() => scrollToSection(developersRef)}>DEVELOPERS</li>
                                <li className='nav-divider'>|</li>
                                <li className='nav-contacts' onClick={() => scrollToSection(contactsRef)}>CONTACTS</li>
                            </div>
                        </ul>

                        <div id='hamburger-toggle' className={`hamburger ${!isOpen ? 'active' : ''}`}  onClick={toggleMenu}>
                            <span className='bar'></span>
                            <span className='bar'></span>
                            <span className='bar'></span>
                        </div>
                </nav>

                {/*HOME SECTION IN LANDING PAGE*/}
                <section id='home' className='home-landing-section' ref={homeRef}>
                    <div className='home-landing'>
                        {/*BACKGROUND IMAGE OF LANDING PAGE*/}
                        <img src='background.png' className='landing-background-img' alt='Background Image'/>
                        {/*HOME SECTION CONTENTS*/}
                        <div className='landing-home-content' >
                            <h1 className='home-yuko-title'>YUKO</h1>
                            <p className='home-yuko-description'>
                                Yuko is a Generative AI assistant powered by Google Gemini, providing accurate answers to student queries. Tailored to meet students' needs, it makes academic support more accessible and helps you stay organized and on track for success.
                            </p>
                            <div className='get-started-button'>
                                <Link to="/Login" className="log-in-button">Get Started</Link>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/*FEATURES SECTION IN LANDING PAGE*/}
                <section id='features' className='features-landing-section'>
                    <div className='features-landing' ref={featuresRef}>
                        {/*FEATURES TOP-LEFT SIDE*/}
                        <div className='features-top'>
                            <div className='features-first-section'>
                                <h1 className='feature-title'>FEATURES</h1>
                                <p className='features-top-left-decscription'>Yuko AI is a powerful and reliable tool designed specifically for ICCT students, offering instant, accurate answers to academic and administrative queries. With its up-to-date information, easy navigation, and student-centric design, Yuko makes school procedures more accessible and helps students stay organized and informed. Whether you need guidance on where to submit assignments or how to contact a faculty member, Yuko is always available to assist, ensuring a seamless and efficient academic experience for every student.</p>
                            </div>
                            <div className='feature-section-divider'></div>
                            {/*FEATURES TOP-RIGHT SIDE WITH SCROLL FEATURE*/}
                            <div className='features-scroll-section'>
                                <div className='features'>
                                    <img className='features-pic-odd' src='https://placehold.co/168x113' alt='feature content picture'></img>
                                    <div className='first-feature-content-odd'>
                                        <p className='features-title-odd'>Academic Guidance</p>
                                        <p className='features-description-odd'>Yuko helps ICCT students navigate their educational journey by providing answers to common questions related to school procedures, such as where to submit assignments or how to contact faculty members.</p>
                                    </div>
                                </div>

                                <div className='features'>
                                    
                                    <div className='first-feature-content-even'>
                                        <p className='features-title-even'>Access to Information</p>
                                        <p className='features-description-even'>Yuko provides quick, accurate answers to a wide range of academic and administrative queries, ensuring students can easily find the information they need, anytime.</p>
                                    </div>
                                    <img className='features-pic-even' src='https://placehold.co/168x113' alt='feature content picture'></img>
                                </div>

                                <div className='features'>
                                    <img className='features-pic-odd' src='https://placehold.co/168x113' alt='feature content picture'></img>
                                    <div className='first-feature-content-odd'>
                                        <p className='features-title-odd'>Updated and Accurate</p>
                                        <p className='features-description-odd'>Yuko is continuously updated with the latest school information, policies, and schedules, ensuring students always have access to the most current details.</p>
                                    </div>
                                </div>

                                <div className='features'>
                                    
                                    <div className='first-feature-content-even'>
                                        <p className='features-title-even'>Easy Navigation</p>
                                        <p className='features-description-even'>
                                            Need to know where to go for a specific task? Yuko can guide you to the right department, office, or faculty, helping you navigate campus procedures efficiently.
                                        </p>
                                    </div>
                                    <img className='features-pic-even' src='https://placehold.co/168x113' alt='feature content picture'></img>
                                </div>
                            </div>
                        </div>

                        <div className='features-bottom'>
                            <img src='chatbot1.png' alt='chatbot' className='chatbot1'></img>
                            <img src='chatbot2.png' alt='chatbot' className='chatbot2'></img>
                        </div>
                    </div>
                </section>

                {/*DEVELOPERS SECTION IN LANDING PAGE*/}
                <section id='developers' ref={developersRef} className='dev-landing-section'>
                    <div className='dev-landing'>
                        {/*DEVELOPERS PAGE TITLE*/}
                        <h1 className='dev-title'>DEVELOPERS</h1>
                        {/*DEVELOPER 1 SHAPES CONTAINER*/}
                        <div className='first-dev-shape-outline'></div>
                        <div className='first-dev-shape-inside'></div>

                        {/*DEVELOPER 1 CONTENT*/}
                        <div className='first-dev'>
                            {/*DEVELOPER 1 PIC*/}
                            <img className='first-dev-pic' src='angelo.jpg' alt='first developer picture'/>
                            {/*DEVELOPER 1 INFOS*/}
                            <div className='first-dev-infos'>
                                <p className='first-dev-name'>Angelo Egwaras</p>
                                <p className='first-dev-description'>Scrum Master/Project Manager</p>
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
                                <p className='second-dev-description'>Backend Developer</p>
                            </div>

                            {/*DEVELOPER 2 PIC*/}
                            <img className='second-dev-pic' src='yohan.jpeg' alt='second developer picture'/>
                        </div>

                        {/*DEVELOPER 3 SHAPES CONTAINER*/}
                        <div className='third-dev-shape-outline'></div>
                        <div className='third-dev-shape-inside'></div>

                        {/*DEVELOPER 3 CONTENT*/}
                        <div className='third-dev'>
                            {/*DEVELOPER 3 PIC*/}
                            <img className='third-dev-pic' src='adryan.jpg' alt='third developer picture'/>
                            {/*DEVELOPER 3 INFOS*/}
                            <div className='third-dev-infos'>
                                <p className='third-dev-name'>Adryan Antiporda</p>
                                <p className='third-dev-description'>Backend Developer</p>
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
                                <p className='fourth-dev-description'>UI/UX/Front-end Developer</p>
                            </div>

                            {/*DEVELOPER 4 PIC*/}
                            <img className='fourth-dev-pic' src='faith.jpg' alt='fourth developer picture'/>
                        </div>

                        {/*DEVELOPER 5 SHAPES CONTAINER*/}
                        <div className='fifth-dev-shape-outline'></div>
                        <div className='fifth-dev-shape-inside'></div>

                        {/*DEVELOPER 5 CONTENT*/}
                        <div className='fifth-dev'>
                            {/*DEVELOPER 5 PIC*/}
                            <img className='fifth-dev-pic' src='wadie.jpg' alt='third developer picture'/>
                            {/*DEVELOPER 5 INFOS*/}
                            <div className='fifth-dev-infos'>
                                <p className='fifth-dev-name'>Wadie Ibrahim Camaligan</p>
                                <p className='fifth-dev-description'>Front-end Developer</p>
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
                                <p className='sixth-dev-description'>UI/UX/Front-end Developer</p>
                            </div>

                            {/*DEVELOPER 6 PIC*/}
                            <img className='sixth-dev-pic' src='ericka.jpg' alt='sixth developer picture'/>
                        </div>
                    </div>
                </section>


                <section id='contacts' ref={contactsRef} className='landing-footer-section'>
                    <div className='contacts-landing'>
                        <div className='footer-left'>
                            <img className='footer-yuko-logo' src='Yuko_logo_text.png' alt='YUKO Logo'/>
                            <p className='ai-description-footer'> Yuko is a Generative AI assistant powered by Google Gemini.</p>
                        </div>
                        <div className='footer-other-pages'>
                            <p className='quick-links-title'>Quick Links</p>
                            <a className='footer-links' onClick={() => scrollToSection(homeRef)} style={{ cursor: 'pointer' }}>Home</a>
                            <a className='footer-links' onClick={() => scrollToSection(featuresRef)} style={{ cursor: 'pointer' }}>Features</a>
                            <a className='footer-links' onClick={() => scrollToSection(developersRef)} style={{ cursor: 'pointer' }}>Developers</a>
                            <a className='footer-links' onClick={() => scrollToSection(contactsRef)} style={{ cursor: 'pointer' }}>Contacts</a>
                        </div>
                        
                        <div className='footer-contacts'>
                            <p className='contacts-title'>Contacts</p>
                            <a className='footer-links' title='solutionjnatech@gmail.com' target='_blank' href='https://mail.google.com/mail/u/0/#inbox?compose=new' >Email</a>
                            <a className='footer-links' title='none' onClick={() => scrollToSection(contactsRef)}>Facebook</a>
                            <a className='footer-links' title='JNA Tech Solution' href='https://www.linkedin.com/company/jnatechsolution/' target='_blank'>LinkedIn</a>
                            <a className='footer-links' title='+639218087458' onClick={() => scrollToSection(contactsRef)}>Phone Number</a>
                        </div>
                    </div>
                    
                    <div className='horizontal-line'></div>
                    <div className='last-section'>
                        <p className='copyrights'>
                         Copyrights &copy; {date}{" "} JNA Tech Solution. All Right Reserved.
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Landing;