const express = require('express');
const { createReport, getAllReports, updateReportStatus, deleteReport, getreportbyid, getdeliveredReports, getDeliveredReports } = require('../controllers/reportController');
const requireAuth = require('../middlewares/requireUserAuth');
const requireUserSupportAuth = require('../middlewares/requireUserSupport');
const ActionTypes = require('../constants/actionTypes');
const logActivity = require('../middlewares/logActivity');
const requireAdminAuth = require('../middlewares/requireAdminAuth');
const reportRouter = express.Router();

reportRouter.post('/:reportedUserId',requireAuth,logActivity(ActionTypes.CREATE_REPORT), createReport);
reportRouter.get('/',requireUserSupportAuth,getAllReports);
reportRouter.get('/:id',requireUserSupportAuth,getreportbyid);
reportRouter.put('/:reportId',requireUserSupportAuth,logActivity(ActionTypes.UPDATE_REPORT_STATUS) ,updateReportStatus);
reportRouter.put('/admin/:reportId',requireAdminAuth ,updateReportStatus);
reportRouter.delete('/:id',requireUserSupportAuth, logActivity(ActionTypes.DEL_REPORT),deleteReport);
reportRouter.get('/admin/delivered',requireAuth ,getDeliveredReports);

module.exports = reportRouter;
