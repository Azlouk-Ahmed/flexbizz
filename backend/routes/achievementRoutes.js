const express = require('express');
const router = express.Router();
const { getAchievementsByFreelancerId, getClientAchievements, createAchievement, getIncomeDifferenceForFreelancer, getClientSpendingDifference, getRatingByFreelancerId, getGlobalFinance, getTotalFinancesByUserId } = require('../controllers/achievementController');
const requireAuth = require('../middlewares/requireUserAuth');
const logActivity = require('../middlewares/logActivity');
const ActionTypes = require('../constants/actionTypes');


router.get('/freelancer/:freelancerId',requireAuth,logActivity(ActionTypes.CONSULTED_USER), getAchievementsByFreelancerId);
router.get('/freelancer/rate/:freelancerId', getRatingByFreelancerId);

router.get('/income/:freelancerId', getIncomeDifferenceForFreelancer);
router.get('/spending/:clientId', getClientSpendingDifference);


router.get('/client/:id', getClientAchievements);
router.get('/admin/', getGlobalFinance);
router.get('/finances/:userId', getTotalFinancesByUserId);


router.post('/:id',requireAuth,logActivity(ActionTypes.EVALUATE), createAchievement);

module.exports = router;
