const Activity = require('../models/AcitivityModel');

// Controller function to get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 }); // Sorting by recent activities first
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get total count of activities by user
exports.getTotalActivitiesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const count = await Activity.countDocuments({ userId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get activities by user sorted by recent activities first
exports.getActivitiesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const activities = await Activity.find({ userId }).sort({ timestamp: -1 }); // Sorting by recent activities first
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  