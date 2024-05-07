const express = require('express');
const router = express.Router();
const { getAchievementsByFreelancerId, getClientAchievements, createAchievement, getIncomeDifferenceForFreelancer, getClientSpendingDifference } = require('../controllers/achievementController');
const requireAuth = require('../middlewares/requireUserAuth');


router.get('/freelancer/:freelancerId', getAchievementsByFreelancerId);

router.get('/income/:freelancerId', getIncomeDifferenceForFreelancer);
router.get('/spending/:clientId', getClientSpendingDifference);


router.get('/client/:id', getClientAchievements);


router.post('/:id',requireAuth, createAchievement);

module.exports = router;
