const Achievement = require('../models/achievementModel');


async function getAchievementsByFreelancerId(req, res) {
    try {
        const achievements = await Achievement.find({ freelancer: req.params.freelancerId });
        const totalIncome = achievements.reduce((acc, el) => acc + el.budget, 0);
        res.json({totalIncome :totalIncome, achievements});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getClientAchievements(req, res) {
    try {
        const achievements = await Achievement.find({ client: req.params.id });
        const totalSpendings = achievements.reduce((acc, el) => acc + el.budget, 0);
        res.json({totalSpendings :totalSpendings, achievements});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function createAchievement(req, res) {
    const achievement = new Achievement({
        client: req.user._id, 
        freelancer: req.params.id,
        announcement: req.body.announcementId,
        clientRating: req.body.clientRating,
        clientComment: req.body.clientComment,
        budget: req.body.budget
    });

    try {
        const newAchievement = await achievement.save();
        res.status(201).json(newAchievement);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { getAchievementsByFreelancerId, getClientAchievements, createAchievement };
