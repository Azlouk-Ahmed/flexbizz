const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reported: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    about: {
      type: String,
      enum: ["chat", "announcement", "scams", "comments", "reclamation", "profile","freelancer report"],
      required: true,
    },
    elementReported: { type: Object },
    description: { type: String, required: true },
    status: { type: String, enum: ["delivered", "pending", "cancelled","handled"], default: "pending" },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
