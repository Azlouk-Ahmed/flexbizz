const mongoose = require('mongoose');
const ChatModel = require("../models/chatModel")
const User = require("../models/userModel")



const createChat = async (req, res) => {
  const currentUserId = req.user._id;
  const { seconUserId } = req.params;

  const objectId = new mongoose.Types.ObjectId(seconUserId);


  const existingChat = await ChatModel.findOne({
    members: {
      $size: 2,
      $all: [
        { $elemMatch: { $eq: currentUserId } },
        { $elemMatch: { $eq: objectId } }
      ]
    }
  });

  if (existingChat) {
    return res.status(200).json(existingChat);
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
    const senderUser = await User.findById(req.user._id);
    const receiverUser = await User.findById(req.params.secondId);
    console.log(receiverUser);
    const chat = await ChatModel.findOne({
  members: {
    $size: 2,
    $all: [
      { $elemMatch: { $eq: receiverUser._id } },
      { $elemMatch: { $eq: senderUser._id } }
    ]
  }
});
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { findChat, createChat, userChats };