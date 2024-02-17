const express = require("express");
const { getUserById} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/:id', getUserById);

module.exports = userRouter;