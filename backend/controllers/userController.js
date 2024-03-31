const User = require("../models/userModel");

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendConnectionRequest = async (req, res) => {
  const requesterId = req.user._id;
  const recipientId = req.params.userId; 

  if (requesterId.toString() === recipientId) {
    return res.status(400).json({ message: "You cannot connect to yourself." });
  }

  try {
    const recipientUser = await User.findById(recipientId);

    if (!recipientUser) {
      return res.status(404).json({ message: "Recipient user not found." });
    }

    const existingConnectionIndex = recipientUser.connections.findIndex(
      (connection) => connection.userId.toString() === requesterId.toString()
    );

    if (existingConnectionIndex !== -1) {
      recipientUser.connections.pull(recipientUser.connections[existingConnectionIndex]._id);
    }

    recipientUser.connections.push({
      userId: requesterId,
      status: 'pending',
    });

    await recipientUser.save();

    res.status(200).json({ message: "Connection request sent successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getPendingConnectionsForUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pendingConnections = user.connections
      .filter(conn => conn.status === 'pending');
      
    const populatedConnections = await Promise.all(pendingConnections.map(async (connection) => {
      const user = await User.findById(connection.userId);
      const fullUserStatus = {...user.toObject(), connection : connection}
      return fullUserStatus ? fullUserStatus : null;
    }));

    res.json(populatedConnections.filter(Boolean));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





const acceptConnectionRequest = async (req, res) => {
  const userId = req.user._id;
  const connectionId = req.params.connectionId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const connection = user.connections.find(
      (connection) => connection._id.toString() === connectionId && connection.status === 'pending'
    );

    if (!connection) {
      return res.status(404).json({ message: "Connection request not found or already accepted." });
    }

    connection.status = 'accepted';
    await user.save();

    const requester = await User.findById(connection.userId);
    if (!requester) {
      return res.status(404).json({ message: "Requester not found." });
    }

    const alreadyConnected = requester.connections.some(
      (connection) => connection.userId.toString() === userId.toString()
    );

    if (!alreadyConnected) {
      requester.connections.push({
        userId: userId,
        status: 'accepted',
      });
      await requester.save();
    }

    res.json({ message: "Connection request accepted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const rejectConnectionRequest = async (req, res) => {
  const userId = req.user._id; 
  const requesterId = req.params.userId; 

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const connectionIndex = user.connections.findIndex(conn => conn.userId.toString() === requesterId && conn.status === 'pending');

    if (connectionIndex !== -1) {
      user.connections[connectionIndex].status = 'rejected';
      await user.save();
      res.json({ message: "Connection request rejected" });
    } else {
      return res.status(400).json({ message: "No pending connection request found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = { getUserById,getPendingConnectionsForUser, getAllUsers,sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest };
