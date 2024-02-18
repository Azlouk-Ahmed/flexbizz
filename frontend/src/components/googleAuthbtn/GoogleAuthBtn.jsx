import React from 'react'
import "./googlebtn.css"

function GoogleAuthBtn() {
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };
    
  return (
    <div>
        <div id="gSignInWrapper" onClick={google}>
            <div id="customBtn" className="customGPlusSignIn">
            <span className="icon"></span>
            <span className="buttonText">Google</span>
            </div>
        </div>
        <div id="name"></div>
    </div>
  )
}

export default GoogleAuthBtn