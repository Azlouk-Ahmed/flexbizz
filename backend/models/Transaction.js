const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  freelancerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  projectBudget: {
    type: Number,
    required: true
  },
  platformFee: {
    type: Number,
    required: true,
    default: function() {
      return this.projectBudget * 0.05;
    }
  },
  freelancerNetMoney: {
    type: Number,
    required: true,
    default: function() {
      return this.projectBudget - this.platformFee;
    }
  }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
