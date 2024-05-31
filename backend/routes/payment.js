const express = require("express");
const { payer } = require("../controllers/payment");
const logActivity = require("../middlewares/logActivity");
const ActionTypes = require("../constants/actionTypes");

const paymentRouter = express.Router();

paymentRouter.post("/payer",logActivity(ActionTypes.PAY_SYSTEM), payer);

module.exports = paymentRouter;