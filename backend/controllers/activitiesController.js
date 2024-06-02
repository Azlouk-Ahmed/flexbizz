const Activity = require('../models/AcitivityModel');


exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 }); 
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTotalActivitiesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const count = await Activity.countDocuments({ userId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getActivitiesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if(!userId) {
       const activities = await Activity.find().sort({ timestamp: -1 }); 
      returnres.json(activities);
    }
    const activities = await Activity.find({ userId }).sort({ timestamp: -1 }); 
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  