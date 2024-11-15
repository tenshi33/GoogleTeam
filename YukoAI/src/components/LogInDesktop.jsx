

function LogInDesktop() {

    return(
        <>
            <section className="log-in-section" id="Log-In">
                <img className="desktop-bg" src="Desktop without ic.png" alt="Background Image"/>

                <div className="log-in">
                    <h1 className="log-in-text">Log In</h1>
                    <input className="email-address" id="email" type="email" placeholder="Email Address"></input>
                    <input className="password" id="password" type="password" placeholder="Password"></input>
                    <a className="forgot-pass-text" href="#" target="_self">Forgot Password?</a>
                    <div id="recoverPasswordModal" style={{ display: 'none' }}></div>
          <input type="email" id="emailForPasswordReset" placeholder="Enter your email" required />
              <button type="button" id="resetPasswordButton">Reset Password</button>
              <p id="statusMessage"></p>
                    <button id= "login" className="log-in-button">Log In</button>
                    <div className="no-account">
                        <p className="no-account-text">Don’t have an account yet?</p>
                        <a className="sign-up-button" href="#">Sign Up</a>
                    </div>
                    

                </div>

                <div className="yuko-logo">
                    <img className="logo" src="YUKO-LOGO-FULL.png" alt="Yuko Logo"/>
                </div>
            </section>
            
        </>
        
    );
}


export default LogInDesktop