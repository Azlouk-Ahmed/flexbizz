const mongoose = require('mongoose');
const ChatModel = require("../models/chatModel")



const createChat = async (req, res) => {
  const currentUserId = req.user._id;
  const { seconUserId } = req.params;

  const objectId = new mongoose.Types.ObjectId(seconUserId);


  const existingChat = await ChatModel.findOne({
    members: { $all: [currentUserId, objectId] }
  });

  if (existingChat) {
    return res.status(409).json({ error: 'Chat already exists' });
  }

  const newChat = new ChatModel({
    members: [currentUserId, objectId],
  });

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};



const userChats = async (req, res) => {
  const currentUserId = req.user._id;
  try {
    const chats = await ChatModel.find({
      members: { $all: [currentUserId] }
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};


const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.user._id, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};

module.exports = { findChat, createChat, userChats };