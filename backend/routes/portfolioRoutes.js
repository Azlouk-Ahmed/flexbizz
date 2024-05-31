const express = require('express');
const { getAllPortfolios, getPortfolioById, createPortfolio, updatePortfolio, getCurrentUserPortfolio } = require('../controllers/portfolioController');
const requireAuth = require('../middlewares/requireUserAuth');
const logActivity = require('../middlewares/logActivity');
const ActionTypes = require('../constants/actionTypes');
const portfolioRouter = express.Router();

portfolioRouter.get('/', getAllPortfolios);
portfolioRouter.get('/getuserportfolio/:userId', getPortfolioById);
portfolioRouter.get('/user',requireAuth, getCurrentUserPortfolio);
portfolioRouter.post('/',requireAuth,logActivity(ActionTypes.CREATED_PORTFOLIO), createPortfolio);
portfolioRouter.put('/',requireAuth, updatePortfolio);

module.exports = portfolioRouter;
