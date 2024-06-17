const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionControllers'); 
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const requireUserAuth = require("../middlewares/requireUserAuth")

// Define routes
router.get('/user/:userId',requireUserAuth, transactionController.getByUser);
router.post('/',requireAdminAuth, transactionController.createTransaction);

module.exports = router;