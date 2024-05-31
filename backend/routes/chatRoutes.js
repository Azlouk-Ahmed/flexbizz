const requireAuth = require("../middlewares/requireUserAuth");

const express = require("express");
const { findChat, createChat, userChats} = require("../controllers/chatController");
const logActivity = require("../middlewares/logActivity");
const ActionTypes = require("../constants/actionTypes");


const chatRouter = express.Router();

chatRouter.post('/:seconUserId', requireAuth,logActivity(ActionTypes.CREATE_COMMENT), createChat);
chatRouter.get('/', requireAuth, userChats);
chatRouter.get('/find/:secondId', requireAuth, findChat);

module.exports = chatRouter;
