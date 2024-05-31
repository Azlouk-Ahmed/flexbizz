// middlewares/logActivity.js
const Activity = require('../models/AcitivityModel'); // Ensure the model name is correctly spelled
const ActionTypes = require('../constants/actionTypes');

const logActivity = (action) => {
  return async (req, res, next) => {
    if (!Object.values(ActionTypes).includes(action)) {
      return res.status(400).json({ error: 'Invalid action type' });
    }

    try {
      const activityDetails = {
        params: req.params,
        query: req.query,
        ...(req.body && Object.keys(req.body).length > 0 && { body: req.body })
      };

      const activity = new Activity({
        userId: req.user._id,
        action,
        details: activityDetails,
      });
      await activity.save();

    } catch (error) {
      console.error('Failed to log activity:', error);
    }
    next();
  };
};

module.exports = logActivity;
