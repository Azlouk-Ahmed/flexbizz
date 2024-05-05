const ChatModel = require("../models/chatModel")
const MessageModel = require("../models/messageModel");
const userModel = require("../models/userModel");

const addMessage = async (req, res) => {
  const { chatId, text, file } = req.body;
  console.log(req.body);
  const senderId = req.user._id;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
    file,
  });
  try {
    console.log("file : ",file);
    const chat = await ChatModel.findById(chatId);
    const sender = await userModel.findById(senderId);
    if(!chat) {
        return res.status(500).json({"mssg": "chat not found"});
    }
    if(!sender) {
        return res.status(500).json({"mssg": "user not found"});
    }
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await MessageModel.find({ chatId }).sort({ createdAt: 1 });
    if(!result) {

      return res.status(500).json({"mssg":"error"});
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {addMessage, getMessages};