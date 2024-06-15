const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionControllers'); 
const requireAdminAuth = require('../middlewares/requireAdminAuth');

// Define routes
router.get('/user/:userId',requireAdminAuth, transactionController.getByUser);
router.post('/',requireAdminAuth, transactionController.createTransaction);

module.exports = router;