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

exports.getTopUsersByActivityCount = async (req, res) => {
  try {
    const topUsers = await Activity.aggregate([
      {
        $group: {
          _id: "$userId",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 3
      },
      {
        $lookup: {
          from: "users", // Assuming your User model collection is named "users"
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user" // Unwind the user array
      },
      {
        $project: {
          _id: "$user._id",
          name: "$user.name",
          familyName: "$user.familyName",
          img: "$user.img",
          count: 1
        }
      }
    ]);

    res.json(topUsers);
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

  