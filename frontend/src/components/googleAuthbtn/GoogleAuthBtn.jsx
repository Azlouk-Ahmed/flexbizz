import React from 'react'
import "./googlebtn.css"
import axios from "axios"

function GoogleAuthBtn() {
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };
    const signIn = async () => {
        axios.get("http://localhost:5000/auth/user")
        .then(response => {
          console.log("Google authentication successful", response);
        })
        .catch(error => {
          console.error("Error signing in with Google", error);
        });
    }
    
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