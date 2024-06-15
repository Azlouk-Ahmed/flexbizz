const Notification = require("../models/notifications"); 
const User = require("../models/userModel"); 

const createNotification = async (req, res) => {
  try {
    const { receiverId, elementId, notificationType, username, message } = req.body;
    console.log(req.body);

    if (!receiverId || !elementId || !notificationType || !username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const senderId = req.user._id;
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    const notification = new Notification({
      receiverId,
      fromId: senderId,
      elementId,
      notificationType,
      username,
      message
    });
    const savedNotification = await notification.save();

    res.status(201).json({ message: "Notification created successfully", notification: savedNotification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getNotifications = async (req, res) => {
    try {
      const userId = req.user._id;
  
      
      const notifications = await Notification.find({ receiverId: userId })
        .sort({ createdAt: -1 }) 
        .populate('fromId');
  
      res.status(200).json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching notifications" });
    }
};

const deleteNotification = async (req, res) => {
    try {
      const { notificationId } = req.params;
  
    
      if (!notificationId) {
        return res.status(400).json({ message: "Missing notification ID" });
      }
  
    
      const deletedNotification = await Notification.findByIdAndDelete(notificationId);
  
      if (!deletedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
  
      res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting notification" });
    }
  };

module.exports = { createNotification, getNotifications, deleteNotification };
