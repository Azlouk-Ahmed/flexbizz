const Comment = require('../models/commentModel');
const Announcement = require("../models/AnnoucementModal")
const User = require("../models/userModel")

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const createdBy = req.user._id;
    const announcementId = req.params.announcementId;

    let announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    const comment = new Comment({
      content,
      createdBy,
      announcement: announcement,
    });

    await comment.save();

    const user = await User.findById(createdBy);

    const commentWithUser = {
      ...comment.toObject(),
      createdBy: user,
    };

    announcement.comments.push(comment._id);
    await announcement.save();

    res.status(201).json(commentWithUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

const getCommentsByAnnouncementId = async (req, res) => {
  try {
    const announcementId = req.params.announcementId;
    const comments = await Comment.find({ announcement: announcementId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const createdBy = req.user._id;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.createdBy.toString() !== createdBy) {
      return res.status(403).json({ error: 'You are not authorized to update this comment' });
    }

    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const createdBy = req.user._id;
    const announcementId = req.params.announcementId;

    let announcement = await Announcement.findById(announcementId);

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (comment.createdBy.toString() !== createdBy.toString()) {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' });
    }
    announcement.comments.pull(comment._id);
    await announcement.save();
    const deletedDocument = await Comment.findByIdAndDelete(id);
    res.json(deletedDocument );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComment,
  getCommentsByAnnouncementId,
  updateCommentById,
  deleteCommentById,
};
