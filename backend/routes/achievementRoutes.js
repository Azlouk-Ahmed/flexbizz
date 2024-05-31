const express = require('express');
const router = express.Router();
const { getAchievementsByFreelancerId, getClientAchievements, createAchievement, getIncomeDifferenceForFreelancer, getClientSpendingDifference, getRatingByFreelancerId } = require('../controllers/achievementController');
const requireAuth = require('../middlewares/requireUserAuth');


router.get('/freelancer/:freelancerId', getAchievementsByFreelancerId);
router.get('/freelancer/rate/:freelancerId', getRatingByFreelancerId);

router.get('/income/:freelancerId', getIncomeDifferenceForFreelancer);
router.get('/spending/:clientId', getClientSpendingDifference);


router.get('/client/:id', getClientAchievements);


router.post('/:id',requireAuth, createAchievement);

module.exports = router;
