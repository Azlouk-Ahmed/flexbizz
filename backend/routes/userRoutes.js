const express = require("express");
const requireAuth = require("../middlewares/requireUserAuth");
const { getUserById, getAllUsers, sendConnectionRequest, getPendingConnectionsForUser, acceptConnectionRequest, removeConnection} = require("../controllers/userController");
const { loginUser, signUpUser } = require("../controllers/authcontroller");

const userRouter = express.Router();

userRouter.get('/:id', getUserById);
userRouter.get('/', getAllUsers);
userRouter.post('/login', loginUser);
userRouter.post('/signup', signUpUser);
userRouter.post('/connection/:userId',requireAuth, sendConnectionRequest);
userRouter.get('/connections/pending',requireAuth,  getPendingConnectionsForUser);
userRouter.post('/connections/accept/:connectionId',requireAuth,  acceptConnectionRequest);
userRouter.post('/connections/remove/:userId',requireAuth,  removeConnection);

module.exports = userRouter;