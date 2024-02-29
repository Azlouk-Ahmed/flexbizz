const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireUserSupportAuth = async (req, res, next) => {
    const Authorization = req.headers["authorization"];
    if (!Authorization) {
        return res.status(500).json({"mssg": "user Support member must be logged in"});
    }
    const token = Authorization.split(" ")[1];

    try {
        const id = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(id);

        if (!user) {
            return res.status(500).json({"mssg": "No user support found with this token"});
        }

        if (user.role !== "Support") {
            return res.status(500).json({"mssg": "This user is not an user support"});
        }
        next();
    } catch (error) {
        return res.status(500).json({"mssg": "Error verifying token or finding user", "error": error});
    }
}
module.exports = requireUserSupportAuth;