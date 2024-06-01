const express = require('express');
const { getAllActivities, getTotalActivitiesByUser, getActivitiesByUser } = require('../controllers/activitiesController');
const router = express.Router();


// Route to get all activities
router.get('/activities', getAllActivities);

// Route to get total count of activities by user
router.get('/activities/count/:userId', getTotalActivitiesByUser);

// Route to get activities by user sorted by recent activities first
router.get('/activities/:userId', getActivitiesByUser);

module.exports = router;
