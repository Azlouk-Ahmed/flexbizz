const _ = require('lodash');
const Announcement = require('../models/AnnoucementModal');
const Proposition = require("../models/PropositionModel")

const createAnnouncement = async (req, res) => {
  const { position, description, jobType, skillsRequired, budgetMin, budgetMax, deadline, workingEnvironnement, attachment } = req.body;
  const requiredFields = ['position', 'description', 'jobType', 'skillsRequired', 'budgetMin', 'budgetMax', 'deadline', 'workingEnvironnement', 'attachment'];

  const emptyFields = requiredFields.filter(field => !req.body[field]); 

  if (emptyFields.length > 0) {
    console.log(emptyFields);
    const message = `Required fields are missing: ${emptyFields.join(', ')}`;
    return res.status(400).json({ message });
  }
  
    try {
  
      const announcement = new Announcement({
        position,
        description,
        jobType,
        skillsRequired,
        budgetMin,
        budgetMax,
        deadline,
        workingEnvironnement,
        attachment,
        createdBy: req.user._id,
      });
  
      await announcement.save();
      res.status(201).json(announcement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id).populate('createdBy');
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncementsByUser= async (req, res) => {
  try {
    const announcement = await Announcement.find({createdBy : req.params.id});
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const createdBy = req.user._id;
    const announcementData = _.omitBy(req.body, _.isEmpty);
    const announcement = await Announcement.findByIdAndUpdate(id, { ...announcementData, createdBy }, { new: true });
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    await announcement.populate('createdBy').execPopulate();
    res.json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likeAnnouncement = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      const announcement = await Announcement.findById(id).populate('createdBy');
      if (!announcement) {
        return res.status(404).json({ error: 'Announcement not found' });
      }
      const userIndex = announcement.likes.indexOf(userId);
      if (userIndex !== -1) {
        announcement.likes.splice(userIndex, 1);
      } else {
        announcement.likes.push(userId);
      }
      await announcement.save();
      res.json(announcement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const applyAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        
        // Step 1: Verify Query Conditions
        const announcement = await Announcement.findById(id);
        if (!announcement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }
        
        const userIndex = announcement.applied.indexOf(userId);
        if (userIndex !== -1) {
            announcement.applied.splice(userIndex, 1);

            // Step 2: Logging
            const prop = await Proposition.findOneAndDelete({ announcementId: id, freelancer: userId });
            console.log("Deleted object:", prop);

            // Step 4: Error Handling
            if (!prop) {
                return res.status(404).json({ error: 'Document not found or already deleted' });
            }
        } else {
            announcement.applied.push(userId);
        }
        
        await announcement.save();

        res.json(announcement);
    } catch (error) {
        // Step 4: Error Handling (continued)
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
  likeAnnouncement,
  applyAnnouncement,
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncementsByUser
};
