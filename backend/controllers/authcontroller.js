const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "365d" })
}

const getUserTokenLoginFtromGoogle = async (req, res) => {
    const userId = req.user._id;
    
    try {
        const userObject = await User.findById(userId);
        
        if (!userObject) {
            return res.status(401).json({ "message": "Failed to get user" });
        }
        
        const token = generateToken(userId);
        const redirectUrl = `http://localhost:3000/login?token=${token}`;
        return res.redirect(redirectUrl);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ "message": "Internal server error" });
    }
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

module.exports = {getUserFromReq};