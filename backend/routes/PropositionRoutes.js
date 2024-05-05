const express = require('express');
const requireAuth = require('../middlewares/requireUserAuth');
const { createProposition, getPropositionById, getPropositionsByAnnouncement, getPropositionsBySentToClient, deleteProposition } = require('../controllers/PropositionController');
const propositionRouter = express.Router();

propositionRouter.post('/:announcementId',requireAuth, createProposition);
propositionRouter.get('/:announcementId',requireAuth, getPropositionsByAnnouncement);
propositionRouter.delete('/:id',requireAuth, deleteProposition);
propositionRouter.get('/',requireAuth, getPropositionsBySentToClient);

module.exports = propositionRouter;
