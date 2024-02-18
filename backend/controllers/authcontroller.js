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

module.exports = {getUserFromReq};