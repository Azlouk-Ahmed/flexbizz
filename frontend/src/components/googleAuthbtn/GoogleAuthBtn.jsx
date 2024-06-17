import React from 'react'
import "./googlebtn.css"

function GoogleAuthBtn() {
    const google = () => {
        window.open(process.env.REACT_APP_API_URL+"/auth/google", "_self");
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