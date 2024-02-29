const express = require("express");
const { addMessage, getMessages} = require("../controllers/messageController");
const requireAuth = require("../middlewares/requireUserAuth");
const MessageModel = require("../models/messageModel")
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
// MessageRouter.js
MessageRouter.get('/infinite/:chatId', requireAuth, async (req, res) => {
    const { chatId } = req.params;
    const { page = 1, limit = 3 } = req.query; 
  
    try {
      // Enhanced pagination for infinite scroll
      const messages = await MessageModel.find({ chatId })
                                      .sort({ createdAt: 1 })
                                      .skip((page - 1) * limit) 
                                      .limit(limit);
  
      if (!messages) {
        return res.status(500).json({ message: "Error fetching messages" });
      }
  
      // Calculate total pages available
      const totalMessages = await MessageModel.countDocuments({ chatId });
      const totalPages = Math.ceil(totalMessages / limit);
  
      res.status(200).json({
        messages, 
        currentPage: page, 
        totalPages
      }); 
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: "Error fetching messages" });
    }
  });
  
  

module.exports = MessageRouter;
