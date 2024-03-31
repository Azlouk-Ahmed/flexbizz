const express = require('express');
const { createReport, getAllReports, updateReportStatus, deleteReport } = require('../controllers/reportController');
const requireAuth = require('../middlewares/requireUserAuth');
const requireUserSupportAuth = require('../middlewares/requireUserSupport');
const reportRouter = express.Router();

reportRouter.post('/:reportedUserId',requireAuth, createReport);
reportRouter.get('/',requireUserSupportAuth,getAllReports);
reportRouter.put('/:id',updateReportStatus);
reportRouter.delete('/:id',deleteReport);

module.exports = reportRouter;
