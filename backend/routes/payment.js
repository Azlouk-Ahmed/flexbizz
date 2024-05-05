const express = require("express");
const { payer } = require("../controllers/payment");

const paymentRouter = express.Router();

paymentRouter.post("/payer", payer);

module.exports = paymentRouter;