import React from 'react'
import "./landing.css"
import { AiOutlineRise } from "react-icons/ai";
import { IoMedalOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"
function Landing() {
  return (
    <div className="about">
        <div className="blur"></div>
        <div className="landing-wrapper">
        <div className="ad">
                    <motion.div
                    initial = {{left : "238px"}}
                    whileInView = {{left : "8px"}}
                    transition = {{duration : 3, type : "tween"}}
                    ></motion.div>
                    <span>the best freelancing platform in tunisia</span>
            </div>
            <div className="title">
                <h1>WE MAKE YOUR</h1>
                <h1 className="main-title">BUSINESS <AiOutlineRise /></h1>
                <h1>EASIER</h1>
            </div>
            <div className="join-us">
                <div className="figures">
                        <div>
                            <span>+140</span>
                            <span>hired freelancer</span></div>
                        <div><span>+70</span><span>collaboratings</span></div>
                        <div><span>+200</span><span>sutisfied client</span></div>
                </div>
                <Link className="primary-btn" to="/login">
                    join us
                </Link>
            </div>

        </div>
        <div className="landing-img-container">
            <img src={require("../../img/about.png")} alt='about'/>
            <img src={require("../../img/blob.png")} alt='blob'/>
            <div className="box f1">
                <div>
                    <img src={require("../../img/flouci.png")} alt="flouci logo"/>
                </div>
                <div className="wrapper">
                    <span>instant</span>
                    <span>payment</span>
                </div>
            </div>
            <div className="box f2">
                <div className="icon">
                    
                </div>
                <div className="wrapper">
                    <span>talented</span>
                    <span>freelancers</span>
                </div>
            </div>
            <div className="box f3">
                <div className="icon y">
                    <IoMedalOutline />
                </div>
                <div className="wrapper">
                    <span>awaiting</span>
                    <span>rewards</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing