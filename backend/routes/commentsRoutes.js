const express = require('express');
const { createComment, getCommentsByAnnouncementId, updateCommentById, deleteCommentById } = require('../controllers/commentControllers');
const requireAuth = require('../middlewares/requireUserAuth');
const commentRouter = express.Router();


commentRouter.post('/announcement/:announcementId',requireAuth, createComment);

commentRouter.get('/announcement/:announcementId', getCommentsByAnnouncementId);

commentRouter.put('/announcement/:id',requireAuth, updateCommentById);

commentRouter.delete('/announcement/:announcementId/:id',requireAuth, deleteCommentById);

module.exports = commentRouter;
