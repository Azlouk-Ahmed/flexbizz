const { default: axios } = require("axios");
const { response } = require("express");

const payer = async (req, res) => {

    const url = "https://developers.flouci.com/api/generate_payment";

    const {amount} = req.body;

    const payload = {
        "app_token": "8ac6efbc-3f4c-4e3b-a07e-11bf1f793155",
        "app_secret": "7676a00a-2a53-4bb0-a077-cd9d29d24c1b",
        "accept_card": "true",
        "amount": amount,
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:5000/sucess",
        "fail_link": "http://localhost:5000/fail",
        "developer_tracking_id": "74b5c855-fad3-4ed9-b2fd-4b539d8d4ad0"
    }
    await axios.post(url, payload)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error))
}

module.exports = {payer};