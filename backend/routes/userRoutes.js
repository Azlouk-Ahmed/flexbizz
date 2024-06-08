const express = require("express");
const requireAuth = require("../middlewares/requireUserAuth");
const { getUserById, getAllUsers, sendConnectionRequest, getPendingConnectionsForUser, acceptConnectionRequest, removeConnection, getUserByName, changeUserRole, banUser } = require("../controllers/userController");
const { loginUser, signUpUser } = require("../controllers/authcontroller");
const ActionTypes = require("../constants/actionTypes");
const logActivity = require("../middlewares/logActivity");
const requireAdminAuth = require("../middlewares/requireAdminAuth");
const multer = require("multer");

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/usersimg/'); 
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname); 
    }
});
const upload = multer({ storage: storage });

userRouter.get('/:id', getUserById);
userRouter.get('/', getAllUsers);
userRouter.post('/login', loginUser);
userRouter.post('/search', getUserByName);
userRouter.post('/signup', upload.single('image'), signUpUser); // Use multer for the signup route
userRouter.post('/connection/:userId', requireAuth, sendConnectionRequest);
userRouter.get('/connections/pending', requireAuth, getPendingConnectionsForUser);
userRouter.post('/connections/accept/:connectionId', requireAuth, logActivity(ActionTypes.SEND_CONNECTION_REQUEST), acceptConnectionRequest);
userRouter.post('/connections/remove/:userId', requireAuth, logActivity(ActionTypes.DECLINE_CONNECTION_REQUEST), removeConnection);
userRouter.put('/role', requireAdminAuth, changeUserRole);
userRouter.put('/ban', requireAdminAuth, banUser);

module.exports = userRouter;
