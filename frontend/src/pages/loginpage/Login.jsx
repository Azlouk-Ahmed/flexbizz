import React, { useState } from 'react';
import "./login.css";
import GoogleAuthBtn from "../../components/googleAuthbtn/GoogleAuthBtn";
import { CiLock, CiUser } from "react-icons/ci";
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
	const {dispatch} =  useAuthContext();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in both email and password fields');
            return;
        }
        axios.post("http://localhost:5000/user/login", { email, password })
            .then((response) => {
                dispatch({type: "LOGIN",payload: response.data})
          		localStorage.setItem("auth",JSON.stringify(response.data));
            })
            .catch((error) => {
				setError(error.response.data.error);
            });
    };

    return (
        <div>
            <div className="container">
                <div className="login-content">
                    <form onSubmit={handleLogin}>
                        <h2 className="title">Welcome</h2>
                        <div className="input-div one">
                            <CiUser />
                            <input autoComplete="false" type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-div pass">
                            <CiLock />
                            <input type="password" autoComplete="false" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
						{error && <div className="error">{error}</div>}
                        <a href="/dsf/">Forgot Password?</a>
                        <button type="submit" className="btn">Login</button>
                        <div className="social-auth-container">
                            <span>or login with </span>
                            <GoogleAuthBtn />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
