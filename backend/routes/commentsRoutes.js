const express = require('express');
const { createComment, getCommentsByAnnouncementId, updateCommentById, deleteCommentById } = require('../controllers/commentControllers');
const requireAuth = require('../middlewares/requireUserAuth');
const logActivity = require('../middlewares/logActivity');
const ActionTypes = require('../constants/actionTypes');
const commentRouter = express.Router();


commentRouter.post('/announcement/:announcementId',requireAuth,logActivity(ActionTypes.CREATE_COMMENT), createComment);

commentRouter.get('/announcement/:announcementId', getCommentsByAnnouncementId);

commentRouter.put('/announcement/:id',requireAuth, updateCommentById);

commentRouter.delete('/announcement/:announcementId/:id',requireAuth,logActivity(ActionTypes.DELETE_COMMENT), deleteCommentById);

module.exports = commentRouter;
