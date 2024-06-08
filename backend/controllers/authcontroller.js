const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "365d" })
}

const getUserFromReq = (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            auth: {user : req.user,token : generateToken(req.user._id)},
        });
    }
    else {
        return res.status(400).json({"mssg":"error getting user"});
    }
}

const signUpUser = async (req , res) => {
    console.log("req",req.body);
    const {email, password, img, name, familyName, government, status} = req.body;
    try {
        const user = await User.signUp(email, password, img, name, familyName, government, status);
        const token = generateToken(user._id);
        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.logIn(email, password);
        const token = generateToken(user._id);
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

module.exports = {getUserFromReq, signUpUser, loginUser};