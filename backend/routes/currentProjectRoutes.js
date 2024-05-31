const express = require('express');
const requireAuth = require('../middlewares/requireUserAuth');
const multer = require('multer');
const path = require('path');

const { 
    createCurrentProject, 
    deleteCurrentProject, 
    getAllProjects, 
    getProjectsByUserId,
    addWorkVersion,
    confirmWorkVersion,
    updateWorkbyVersion
} = require('../controllers/currentProject');
const ActionTypes = require('../constants/actionTypes');
const logActivity = require('../middlewares/logActivity');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: './uploads/projectfiles',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post('/:freelancerId', requireAuth,logActivity(ActionTypes.HIRE), createCurrentProject);

router.delete('/:projectId', requireAuth, deleteCurrentProject);

router.get('/', getAllProjects);

router.get('/user/:userId', getProjectsByUserId);

// Add a new work version (freelancer only) with file upload
router.post('/:projectId/work-version', requireAuth, upload.single('file'),logActivity(ActionTypes.ADD_VERSION), addWorkVersion);

// Confirm a work version (client only)
router.put('/:projectId/work-version/:versionNumber/confirm', requireAuth,logActivity(ActionTypes.CONFIRM_VERSION) , confirmWorkVersion);

// Update a work version (freelancer only)
router.put('/:projectId/work-version/:versionNumber', requireAuth, upload.single('file'), logActivity(ActionTypes.UPDATE_VERSION), updateWorkbyVersion);

module.exports = router;
