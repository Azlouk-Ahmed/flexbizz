const {mongoose} = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    file: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageSchema);