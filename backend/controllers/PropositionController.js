const mongoose = require('mongoose');
const Proposition = require('../models/PropositionModel');
const User = require("../models/userModel") ;
const Announcement = require("../models/AnnoucementModal");
const Portfolio = require("../models/portfolioModel")

const createProposition = async (req, res) => {
  const { announcementId } = req.params;
  try {
      const { coverLetter } = req.body;

      const announcement = await Announcement.findById(announcementId);
      if (!announcement) {
          return res.status(400).json({ message: 'Announcement not found' });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      const portfolio = await Portfolio.find({ user: req.user._id });
      
      const existingProposition = await Proposition.findOne({
          announcementId,
          freelancer: req.user._id,
          clientId: announcement.createdBy
      });

      if (existingProposition) {
          return res.status(400).json({ message: 'A proposition already exists for this announcement and freelancer' });
      }
      const newProposition = new Proposition({
          announcementId,
          clientId: announcement.createdBy,
          freelancer: req.user._id,
          coverLetter,
          portfolio: portfolio[0],
      });
      await newProposition.save();

      res.status(201).json({ message: 'Proposition created successfully', proposition: newProposition });
  } catch (error) {
      console.error('Error creating proposition:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createProposition = createProposition;

  

exports.getPropositionsByAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const propositions = await Proposition.find({ clientId: req.user._id, announcementId : announcementId });

    res.status(200).json(propositions );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPropositionsBySentToClient = async (req, res) => {
  try {
    const propositions = await Proposition.find({ clientId: req.user._id }).populate("announcementId freelancer portfolio");

    res.status(200).json(propositions );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getFreelancerPropositions = async (req, res) => {
  try {
    const propositions = await Proposition.find({ freelancer: req.user._id });

    res.status(200).json({ propositions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getPropositionById = async (req, res) => {
  try {
    const { propositionId } = req.params;

    const proposition = await Proposition.findById(propositionId).populate('announcementId freelancer'); // populate related models for details

    if (!proposition) {
      return res.status(404).json({ message: 'Proposition not found' });
    }

    res.status(200).json({ proposition });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteProposition = async (req, res) => {
    try {
      const { id } = req.params;
      const { _id } = req.user; 
  
      const proposition = await Proposition.findOneAndDelete({ _id: id, clientId: _id });
  
      if (!proposition) {
        return res.status(404).json({ message: 'Proposition not found' });
      }
  
      res.status(200).json({ message: 'Proposition deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

module.exports = exports;
