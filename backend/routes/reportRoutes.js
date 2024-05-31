const express = require('express');
const { createReport, getAllReports, updateReportStatus, deleteReport } = require('../controllers/reportController');
const requireAuth = require('../middlewares/requireUserAuth');
const requireUserSupportAuth = require('../middlewares/requireUserSupport');
const ActionTypes = require('../constants/actionTypes');
const logActivity = require('../middlewares/logActivity');
const reportRouter = express.Router();

reportRouter.post('/:reportedUserId',requireAuth,logActivity(ActionTypes.CREATE_REPORT), createReport);
reportRouter.get('/',requireUserSupportAuth,getAllReports);
reportRouter.put('/:id',requireUserSupportAuth,logActivity(ActionTypes.UPDATE_REPORT_STATUS) ,updateReportStatus);
reportRouter.delete('/:id',requireUserSupportAuth, logActivity(ActionTypes.DEL_REPORT),deleteReport);

module.exports = reportRouter;
