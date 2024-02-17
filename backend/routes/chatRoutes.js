const requireAuth = require("../middlewares/requireUserAuth");

const express = require("express");
const { findChat, createChat, userChats, userChatsRoute, usch } = require("../controllers/chatController")


const chatRouter = express.Router();

chatRouter.post('/:seconUserId', requireAuth, createChat);
chatRouter.get('/', requireAuth, userChats);
chatRouter.get('/find/:secondId', requireAuth, findChat);

module.exports = chatRouter;
