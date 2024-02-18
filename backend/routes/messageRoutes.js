const express = require("express");
const { addMessage, getMessages} = require("../controllers/messageController");
const requireAuth = require("../middlewares/requireUserAuth");
const multer = require('multer');

const MessageRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); 
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname); 
    }
});
const upload = multer({ storage: storage });


MessageRouter.post('/', requireAuth, upload.single('_file'), addMessage);

MessageRouter.get('/:chatId', requireAuth, getMessages);

module.exports = MessageRouter;
