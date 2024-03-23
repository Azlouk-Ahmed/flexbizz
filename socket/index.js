const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    socket.on("new-user-add", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {

      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      io.emit("get-users", activeUsers);
    });

    socket.on("typing", (data) => {
        const { receiverId,chatId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        if (user) {
            io.to(user.socketId).emit("typing",{chatId});
            console.log("Typing notification sent to receiver:", receiverId , chatId);
        }
    });
    
    socket.on("stop_typing", (data) => {
        const { receiverId, chatId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        if (user) {
            io.to(user.socketId).emit("stop_typing",{chatId});
            console.log("Stop typing notification sent to receiver:", receiverId, chatId);
        }
    });
  
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId)
      console.log("Data: ", data)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });

    socket.on("send-notification", (notificationData) => {
      const { receiverId, notificationType, username, fromId, elementId } = notificationData;
      const user = activeUsers.find((user) => user.userId === receiverId);
      if (user) {
          io.to(user.socketId).emit("receive-notification", {
              notificationType,
              username,
              fromId, 
              elementId
          });
          console.log("Notification sent to:", receiverId);
      } else {
          console.warn("Receiver not found for notification:", receiverId);
      }
  });
  });