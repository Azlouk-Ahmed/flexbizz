const Achievement = require('../models/achievementModel');
const CurrentProject = require("../models/CurrentProject")
const Announcement = require("../models/AnnoucementModal");


async function getGlobalFinance(req, res) {
    try {
        const achievements = await Achievement.find();
        const announcements = await Announcement.find();
        const currentProjects = await CurrentProject.find().populate("announcement").select("announcement");
        const totalBudget = achievements.reduce((acc, el) => acc + el.budget, 0);
        const predictedIncome = announcements.reduce((acc, el) => acc + el.budgetMax, 0);
        const insystem = currentProjects.reduce((acc, el) => acc + el.announcement.budgetMax, 0);
        const netIncome = totalBudget * 0.05;
        res.json({ totalBudget, netIncome, predictedIncome, insystem });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



async function getAchievementsByFreelancerId(req, res) {
    try {
        const achievements = await Achievement.find({ freelancer: req.params.freelancerId });
        const totalIncome = achievements.reduce((acc, el) => acc + el.budget, 0);
        res.json({totalIncome :totalIncome, achievements});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
async function getRatingByFreelancerId(req, res) {
    try {
        const achievements = await Achievement.find({ freelancer: req.params.freelancerId });
        console.log(achievements);
        const totalrate = achievements.reduce((acc, el) => acc + el.clientRating, 0);
        const avgRate = Math.floor(totalrate / achievements.length);
        if(avgRate) {
            return res.json({avgRating :avgRate});

        }
        res.json({avgRating : 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getIncomeDifferenceForFreelancer(req, res) {
    try {
        const achievements = await Achievement.find({ freelancer: req.params.freelancerId });
        const currentDate = new Date();
        
        // Filter achievements for the current month
        const currentMonthAchievements = achievements.filter(achievement => {
            const achievementDate = new Date(achievement.createdAt);
            return achievementDate.getMonth() === currentDate.getMonth() &&
                achievementDate.getFullYear() === currentDate.getFullYear();
        });
        
        // Filter achievements for the previous month
        const previousMonthAchievements = achievements.filter(achievement => {
            const achievementDate = new Date(achievement.createdAt);
            return achievementDate.getMonth() === currentDate.getMonth() - 1 &&
                achievementDate.getFullYear() === currentDate.getFullYear();
        });
        
        const totalIncomeCurrentMonth = currentMonthAchievements.reduce((acc, el) => acc + el.budget, 0);
        const totalIncomePreviousMonth = previousMonthAchievements.reduce((acc, el) => acc + el.budget, 0);
        
        const incomeDifference = totalIncomeCurrentMonth - totalIncomePreviousMonth;
        
        // Calculate the percentage difference
        const percentageDifference = (incomeDifference / totalIncomePreviousMonth) * 100;
        
        res.json({
            incomeDifference: incomeDifference,
            percentageDifference: percentageDifference,
            totalIncomeCurrentMonth: totalIncomeCurrentMonth,
            totalIncomePreviousMonth: totalIncomePreviousMonth
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getClientSpendingDifference(req, res) {
    try {
        const achievements = await Achievement.find({ client: req.params.clientId });
        const currentDate = new Date();
        
        // Filter achievements for the current month
        const currentMonthAchievements = achievements.filter(achievement => {
            const achievementDate = new Date(achievement.createdAt);
            return achievementDate.getMonth() === currentDate.getMonth() &&
                achievementDate.getFullYear() === currentDate.getFullYear();
        });
        
        // Filter achievements for the previous month
        const previousMonthAchievements = achievements.filter(achievement => {
            const achievementDate = new Date(achievement.createdAt);
            return achievementDate.getMonth() === currentDate.getMonth() - 1 &&
                achievementDate.getFullYear() === currentDate.getFullYear();
        });
        
        const totalSpendingCurrentMonth = currentMonthAchievements.reduce((acc, el) => acc + el.budget, 0);
        const totalSpendingPreviousMonth = previousMonthAchievements.reduce((acc, el) => acc + el.budget, 0);
        
        const spendingDifference = totalSpendingCurrentMonth - totalSpendingPreviousMonth;
        
        // Calculate the percentage difference
        const percentageDifference = (spendingDifference / totalSpendingPreviousMonth) * 100;
        
        res.json({
            spendingDifference: spendingDifference,
            percentageDifference: percentageDifference,
            totalSpendingCurrentMonth: totalSpendingCurrentMonth,
            totalSpendingPreviousMonth: totalSpendingPreviousMonth
        });
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

module.exports = { getAchievementsByFreelancerId, getGlobalFinance, getRatingByFreelancerId, getClientSpendingDifference, getIncomeDifferenceForFreelancer, getClientAchievements, createAchievement };
