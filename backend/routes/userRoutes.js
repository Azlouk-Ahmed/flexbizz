const express = require("express");
const { getUserById, getAllUsers} = require("../controllers/userController");
const { loginUser, signUpUser } = require("../controllers/authcontroller");

const userRouter = express.Router();

userRouter.get('/:id', getUserById);
userRouter.get('/', getAllUsers);
userRouter.post('/login', loginUser);
userRouter.post('/signup', signUpUser);

module.exports = userRouter;