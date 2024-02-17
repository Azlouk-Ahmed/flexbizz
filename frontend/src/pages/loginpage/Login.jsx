import React from 'react'
import "./login.css"
import GoogleAuthBtn from "../../components/googleAuthbtn/GoogleAuthBtn"
import { CiLock, CiUser  } from "react-icons/ci";

function Login() {
  return (
    <div>

        <img className="setting-gif" alt='img' src={require("../../img/settings.gif")} />
        <img className="phone-gif" alt='img' src={require("../../img/phone.gif")} />
        <img className="wave" alt='img' src={require("../../img/wave.png")} />
	<div className="container">
		<div className="img">
			<img src={require("../../img/bg.png")} alt='img' />
		</div>
		<div className="login-content">
			<form action="index.html">
				<img src= {require("../../img/avatar.png")} alt='img' />
				<h2 className="title">Welcome</h2>
           		<div className="input-div one">
					<CiUser />
           		   	<input autoComplete="false"  type="text" className="input" />
           		</div>
           		<div className="input-div pass">
					<CiLock />
           		    <input type="password" autoComplete="false" className="input" />
            	</div>
            	<a href="/dsf/">Forgot Password?</a>
            	<input type="submit" className="btn" value="Login" />
				<div className="social-auth-container">
					<span>or login with </span>
					<GoogleAuthBtn />
				</div>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login