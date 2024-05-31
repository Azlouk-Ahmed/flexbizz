const express = require('express');
const requireAuth = require('../middlewares/requireUserAuth');
const { createProposition, getPropositionById, getPropositionsByAnnouncement, getPropositionsBySentToClient, deleteProposition } = require('../controllers/PropositionController');
const logActivity = require('../middlewares/logActivity');
const ActionTypes = require('../constants/actionTypes');
const propositionRouter = express.Router();

propositionRouter.post('/:announcementId',requireAuth ,logActivity(ActionTypes.SEND_PROPOSITIONS_REQUEST), createProposition);
propositionRouter.get('/:announcementId',requireAuth, getPropositionsByAnnouncement);
propositionRouter.delete('/:id',requireAuth,logActivity(ActionTypes.DECLINE_PROPOSITION_REQUEST), deleteProposition);
propositionRouter.get('/',requireAuth, getPropositionsBySentToClient);

module.exports = propositionRouter;
