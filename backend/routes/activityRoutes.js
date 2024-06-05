const express = require('express');
const { getAllActivities, getTotalActivitiesByUser, getActivitiesByUser, getTopUsersByActivityCount } = require('../controllers/activitiesController');
const router = express.Router();


// Route to get all activities
router.get('/activities', getAllActivities);

// Route to get total count of activities by user
router.get('/activities/count/:userId', getTotalActivitiesByUser);
router.get('/activities/top', getTopUsersByActivityCount);

// Route to get activities by user sorted by recent activities first
router.get('/activities/:userId', getActivitiesByUser);

module.exports = router;
