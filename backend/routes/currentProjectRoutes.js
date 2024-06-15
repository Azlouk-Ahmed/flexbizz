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
    updateWorkbyVersion,
    markProjectAsDone
} = require('../controllers/currentProject');
const ActionTypes = require('../constants/actionTypes');
const logActivity = require('../middlewares/logActivity');
const requireAdminAuth = require('../middlewares/requireAdminAuth');

const router = express.Router();


const storage = multer.diskStorage({
    destination: './uploads/projectfiles',
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post('/:freelancerId', requireAuth,logActivity(ActionTypes.HIRE), createCurrentProject);

router.delete('/:projectId', requireAdminAuth, deleteCurrentProject);

router.get('/', getAllProjects);

router.get('/user/:userId', getProjectsByUserId);

router.post('/:projectId/work-version', requireAuth, upload.single('file'),logActivity(ActionTypes.ADD_VERSION), addWorkVersion);


router.put('/:projectId/work-version/:versionNumber/confirm', requireAuth,logActivity(ActionTypes.CONFIRM_VERSION) , confirmWorkVersion);


router.put('/:projectId/work-version/:versionNumber', requireAuth, upload.single('file'), logActivity(ActionTypes.UPDATE_VERSION), updateWorkbyVersion);

router.patch('/:projectId/markAsDone', requireAuth, markProjectAsDone);

module.exports = router;
