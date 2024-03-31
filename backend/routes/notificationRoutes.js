const express = require('express');
const requireAuth = require('../middlewares/requireUserAuth');
const { createNotification, getNotifications, deleteNotification } = require('../controllers/notificationsController');
const notificationsRouter = express.Router();

notificationsRouter.post('/', requireAuth, createNotification);
notificationsRouter.get('/', requireAuth, getNotifications);
notificationsRouter.delete('/:notificationId', requireAuth, deleteNotification);

module.exports = notificationsRouter;
