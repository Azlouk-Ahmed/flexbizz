const express = require("express");
const { addMessage, getMessages} = require("../controllers/messageController");
const requireAuth = require("../middlewares/requireUserAuth");
const multer = require('multer');

const MessageRouter = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); // Destination folder for file uploads
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Route for handling file uploads along with other message data
MessageRouter.post('/', requireAuth, upload.single('file'), addMessage);

// Route for getting messages
MessageRouter.get('/:chatId', requireAuth, getMessages);

module.exports = MessageRouter;
