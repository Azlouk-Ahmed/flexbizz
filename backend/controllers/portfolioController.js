const _ = require('lodash'); // for data sanitization

const Portfolio = require('../models/portfolioModel'); // Adjust path to your portfolio model

const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate('user');
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentUserPortfolio= async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id }).populate('user'); 
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json({ portfolio}); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPortfolioById = async (req, res) => {
    try {
      const {userId} = req.params;
      const portfolio = await Portfolio.findOne({ user: userId }).populate('user'); 
      if (!portfolio) {
        return res.status(404).json({ message: 'Portfolio not found' });
      }
      res.json({ portfolio, user: portfolio.user }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const createPortfolio = async (req, res) => {
    const sanitizedData = _.pick(req.body, ['name', 'description', 'website', 'socialMedia', 'projects', 'skills', 'experience', 'education', 'awards', 'testimonials']); 
    sanitizedData.user = req.user._id;
  
    try {
      const existingPortfolio = await Portfolio.findOne({ user: req.user._id });
      if (existingPortfolio) {
        return res.status(400).json({ message: 'User already has a portfolio' });
      }
  
      const portfolio = new Portfolio(sanitizedData);
      await portfolio.save();
      res.status(201).json(portfolio);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

const updatePortfolio = async (req, res) => {
  const sanitizedData = _.pick(req.body, ['name', 'description', 'website', 'socialMedia', 'projects', 'skills', 'experience', 'education', 'awards', 'testimonials']); // Sanitize data
  try {
    const portfolio = await Portfolio.findOneAndUpdate({ user: req.user._id }, sanitizedData, { new: true }).populate("user"); // Update and return updated document
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  getCurrentUserPortfolio
};