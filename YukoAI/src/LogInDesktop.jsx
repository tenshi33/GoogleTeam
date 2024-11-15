
function LogInDesktop() {
    return(
        <>
            <section className="log-in-section" id="Log-In">
                <div className="yuko-logo">
                    <img className="logo" src="YUKO-LOGO-FULL.png" alt="Yuko Logo"/>
                </div>

                <img className="desktop-bg" src="Desktop without ic.png" alt="Background Image"/>

                <div className="log-in">
                    <h1 className="log-in-text">Log In</h1>
                    <input className="email-address-button" type="email" placeholder="Email Address"></input>
                    <input className="password-button" type="password" placeholder="Password"></input>
                    <a className="forgot-pass-text" href="#" target="_self">Forgot Password?</a>
                    <button className="log-in-button">Log In</button>
                    <p className="no-account-text">Don’t have an account yet?
                        <a className="sign-up-button" href="#">Sign Up</a>
                    </p>
                </div>

            </section>
            
        </>
        
    );
}

export default LogInDesktop