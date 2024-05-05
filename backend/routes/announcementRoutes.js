const express = require('express');
const requireAuth = require('../middlewares/requireUserAuth');
const { deleteAnnouncement, updateAnnouncement, getAnnouncementById, getAnnouncements, createAnnouncement, likeAnnouncement, applyAnnouncement, getAnnouncementsByUser } = require('../controllers/announcementController');
const handleFileUpload = require('../multerUploads/multer');
const announcementRouter = express.Router();


announcementRouter.post('/', requireAuth,handleFileUpload("_file"), createAnnouncement);

announcementRouter.get('/', getAnnouncements);

announcementRouter.get('/createdby/:id', getAnnouncementsByUser);

announcementRouter.get('/:id', getAnnouncementById);

announcementRouter.put('/:id',requireAuth, updateAnnouncement);

announcementRouter.put('/apply/:id',requireAuth, applyAnnouncement);

announcementRouter.put('/like/:id',requireAuth, likeAnnouncement);

announcementRouter.delete('/:id',requireAuth,deleteAnnouncement);

module.exports = announcementRouter;
