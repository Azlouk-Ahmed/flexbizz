const express = require("express");
const requireAuth = require("../middlewares/requireUserAuth");
const { getUserById, getAllUsers, sendConnectionRequest, getPendingConnectionsForUser, acceptConnectionRequest, removeConnection} = require("../controllers/userController");
const { loginUser, signUpUser } = require("../controllers/authcontroller");
const ActionTypes = require("../constants/actionTypes");
const logActivity = require("../middlewares/logActivity");

const userRouter = express.Router();

userRouter.get('/:id', getUserById);
userRouter.get('/', getAllUsers);
userRouter.post('/login', loginUser);
userRouter.post('/signup',logActivity(ActionTypes.CREATE_ACCOUNT), signUpUser);
userRouter.post('/connection/:userId',requireAuth, sendConnectionRequest);
userRouter.get('/connections/pending',requireAuth,  getPendingConnectionsForUser);
userRouter.post('/connections/accept/:connectionId',requireAuth,logActivity(ActionTypes.SEND_CONNECTION_REQUEST),  acceptConnectionRequest);
userRouter.post('/connections/remove/:userId',requireAuth,logActivity(ActionTypes.DECLINE_CONNECTION_REQUEST) , removeConnection);

module.exports = userRouter;