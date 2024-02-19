const express = require('express');
const { getAllPortfolios, getPortfolioById, createPortfolio, updatePortfolio, getCurrentUserPortfolio } = require('../controllers/portfolioController');
const requireAuth = require('../middlewares/requireUserAuth');
const portfolioRouter = express.Router();

portfolioRouter.get('/', getAllPortfolios);
portfolioRouter.get('/getuserportfolio/:userId', getPortfolioById);
portfolioRouter.get('/user',requireAuth, getCurrentUserPortfolio);
portfolioRouter.post('/',requireAuth, createPortfolio);
portfolioRouter.put('/',requireAuth, updatePortfolio);

module.exports = portfolioRouter;
