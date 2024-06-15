const AnnoucementModal = require('../models/AnnoucementModal');
const Transaction = require('../models/Transaction'); 
const User = require('../models/userModel');


const getByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const transactions = await Transaction.find({
      $or: [{ clientId: userId }, { freelancerId: userId }]
    });

    if (!transactions.length) {
      return res.status(404).json(transactions);
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


const createTransaction = async (req, res) => {
  const { clientId, freelancerId, projectId } = req.body;

  try {
    const client = await User.findById(clientId);
    const freelancer = await User.findById(freelancerId);
    const announcement = await AnnoucementModal.findById(projectId);

    if (!client || !freelancer || !announcement) {
      return res.status(404).json({ error: 'Client , Freelancer or annoucement not found' });
    }

    const transaction = new Transaction({
      clientId,
      freelancerId,
      projectName: announcement.position,
      projectBudget: announcement.budgetMax
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create transaction' });
  }
};

module.exports = {
  getByUser,
  createTransaction
};
