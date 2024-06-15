const express = require('express');
const requireAuth = require('../middlewares/requireUserAuth');
const { deleteAnnouncement, updateAnnouncement, getAnnouncementById, getAnnouncements, createAnnouncement, likeAnnouncement, applyAnnouncement, getAnnouncementsByUser, infiniteGetAnnouncement, toggleAnnouncementStatus } = require('../controllers/announcementController');
const handleFileUpload = require('../multerUploads/multer');
const announcementRouter = express.Router();
const Announcement = require('../models/AnnoucementModal');
const ActionTypes = require('../constants/actionTypes');
const logActivity = require('../middlewares/logActivity');
const requireAdminAuth = require('../middlewares/requireAdminAuth');


announcementRouter.post('/', requireAuth,handleFileUpload("_file"),logActivity(ActionTypes.CREATE_ANNOUNCEMENT), createAnnouncement);

announcementRouter.get('/', getAnnouncements);

announcementRouter.get('/infinite', infiniteGetAnnouncement);

announcementRouter.get('/createdby/:id', getAnnouncementsByUser);

announcementRouter.get('/:id', getAnnouncementById);

announcementRouter.post('/search', async (req, res) => {
    try {
      const {
        postedBy,
        position,
        workingEnvironment,
        fullTime,
        partTime,
        hourly,
        contract,
        minBudget,
        maxBudget,
        expired,
        available,
      } = req.body;
  
      // Build the query object
      const query = {};
  
      if (postedBy) {
        const user = await mongoose.model('User').findOne({ username: postedBy });
        if (user) {
          query.createdBy = user._id;
        } else {
          return res.json([]); // No results if user is not found
        }
      }
  
      if (position) {
        query.position = { $regex: position, $options: 'i' };
      }
  
      if (workingEnvironment) { // Changed from onPlatform and onSite
        query.workingEnvironnement = workingEnvironment; // Use the provided value directly
      }
  
      if (fullTime || partTime || hourly || contract) {
        query.jobType = {
          $in: [
            fullTime && 'Full-Time',
            partTime && 'Part-Time',
            hourly && 'Hourly',
            contract && 'Contract',
          ].filter(Boolean),
        };
      }
  
      if (minBudget || maxBudget) {
        query.budgetMin = { $gte: minBudget || 0 };
        query.budgetMax = { $lte: maxBudget || Number.MAX_SAFE_INTEGER };
      }
  
      if (expired && !available) {
        const now = new Date();
        query.deadline = { $lt: now }; // Filter announcements where the deadline is before the current date
      } else if (!expired && available) {
        const now = new Date();
        query.deadline = { $gte: now }; // Filter announcements where the deadline is on or after the current date
      }
      
      console.log(query);
  
      const announcements = await Announcement.find(query).populate('createdBy', 'username');
  
      res.json(announcements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

announcementRouter.put('/:id',requireAuth, updateAnnouncement);
announcementRouter.put('/accept/:id',requireAdminAuth, toggleAnnouncementStatus);

announcementRouter.put('/apply/:id',requireAuth, applyAnnouncement);

announcementRouter.put('/like/:id',requireAuth, logActivity(ActionTypes.LIKE_ANNOUNCEMENT), likeAnnouncement);

announcementRouter.delete('/del/:id',requireAdminAuth,deleteAnnouncement);

module.exports = announcementRouter;
