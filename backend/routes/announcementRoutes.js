const express = require('express');
const requireAuth = require('../middlewares/requireUserAuth');
const { deleteAnnouncement, updateAnnouncement, getAnnouncementById, getAnnouncements, createAnnouncement, likeAnnouncement } = require('../controllers/announcementController');
const announcementRouter = express.Router();

announcementRouter.post('/', requireAuth, createAnnouncement);

announcementRouter.get('/', getAnnouncements);

announcementRouter.get('/:id', getAnnouncementById);

announcementRouter.put('/:id',requireAuth, updateAnnouncement);

announcementRouter.put('/like/:id',requireAuth, likeAnnouncement);

announcementRouter.delete('/:id',requireAuth,deleteAnnouncement);

module.exports = announcementRouter;
