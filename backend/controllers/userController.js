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

const banUser = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.banned = !user.banned;
    await user.save();
    
    console.log(user);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const sendConnectionRequest = async (req, res) => {
  const requesterId = req.user._id;
  const recipientId = req.params.userId; 

  if (requesterId.toString() === recipientId) {
    return res.status(400).json({ message: "You cannot connect to yourself." });
  }



  try {
    const recipientUser = await User.findById(recipientId);
    const requesterUser = await User.findById(requesterId);

    if (!recipientUser) {
      return res.status(404).json({ message: "Recipient user not found." });
    }

    if (!requesterUser) {
      return res.status(404).json({ message: "Requester user not found." });
    }

    // Check if the recipient already has a connection from the requester
    const existingRecipientConnectionIndex = recipientUser.connections.findIndex(
      (connection) => connection.userId.toString() === requesterId.toString()
    );

    // Check if the requester already has a connection with the recipient
    const existingRequesterConnectionIndex = requesterUser.connections.findIndex(
      (connection) => connection.userId.toString() === recipientId.toString()
    );

    // Remove existing connection if found (for recipient)
    if (existingRecipientConnectionIndex !== -1) {
      recipientUser.connections.pull(recipientUser.connections[existingRecipientConnectionIndex]._id);
    }

    // Remove existing connection if found (for requester)
    if (existingRequesterConnectionIndex !== -1) {
      requesterUser.connections.pull(requesterUser.connections[existingRequesterConnectionIndex]._id);
    }

    // Add new pending connection for recipient
    recipientUser.connections.push({
      userId: requesterId,
      status: 'pending',
    });

    // Add new pending connection for requester
    requesterUser.connections.push({
      userId: recipientId,
      status: 'accepted',
    });

    // Save both users
    await recipientUser.save();
    await requesterUser.save();

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


const changeUserRole = async (req, res) => {
  const { userId, newRole } = req.body;
  const validRoles = ['Admin', 'Support', 'User'];

  if (!validRoles.includes(newRole)) {
      return res.status(400).json({ error: "Invalid role" });
  }

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      user.role = newRole;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
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

const removeConnection = async (req, res) => {
  const userId = req.user._id;
  const requestedUserId = req.params.userId; // This should be the ID of the user to be removed from connections

  try {
    // Find the current user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the connection to be removed
    const connectionIndex = user.connections.findIndex(
      (conn) => conn.userId.toString() === requestedUserId
    );

    if (connectionIndex === -1) {
      return res.status(404).json({ message: "Connection not found." });
    }

    // Remove the connection from the current user's connections array
    user.connections.splice(connectionIndex, 1);
    await user.save();

    // Find the connected user and remove the connection to the current user
    const connectedUser = await User.findById(requestedUserId);
    if (connectedUser) {
      const reverseConnectionIndex = connectedUser.connections.findIndex(
        (conn) => conn.userId.toString() === userId.toString()
      );

      if (reverseConnectionIndex !== -1) {
        connectedUser.connections.splice(reverseConnectionIndex, 1);
        await connectedUser.save();
      }
    }

    res.json({ message: "Connection removed successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserByName = async (req, res) => {
  const { name } = req.body;

  try {

    const users = await User.find({
      $or: [
        { name: { $regex: name, $options: 'i' } }, // Case-insensitive regex match for name
        { familyName: { $regex: name, $options: 'i' } } // Case-insensitive regex match for familyName
      ]
    });


    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { getUserById,changeUserRole , banUser , getUserByName,getPendingConnectionsForUser,removeConnection, getAllUsers,sendConnectionRequest, acceptConnectionRequest, rejectConnectionRequest };
