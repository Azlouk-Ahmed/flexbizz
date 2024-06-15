const Report = require('../models/ReportModel');
const User = require("../models/userModel")

const createReport = async (req, res) => {
    try {
        console.log("reporter", req.user);
        const { about, elementReported, description } = req.body;
        
        // Check if req.user exists and contains _id
        if (!req.user || !req.user._id) {
            return res.status(400).json({ error: 'Invalid user object' });
        }
        
        const reporter = req.user._id;
        const reported = req.params.reportedUserId;

        // Check if reported user ID is provided
        if (!reported) {
            return res.status(400).json({ error: 'Reported user ID is required' });
        }

        const reporterObj = await User.findById(reporter);
        if (!reporterObj) {
            return res.status(404).json({ error: 'Reporter not found' });
        }

        const reportedObj = await User.findById(reported);
        if (!reportedObj) {
            return res.status(404).json({ error: 'Reported user not found' });
        }

        if(description === ""){
            return res.status(403).json({ error: 'Description should not be empty' });
        }

        const report = new Report({
            about,
            elementReported,
            description,
            reporter,
            reported
        });

        await report.save();
        res.status(201).json({ message: 'Report created successfully' });
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        console.error('Error getting reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getDeliveredReports = async (req, res) => {
    try {
      const reports = await Report.find({ status: 'delivered' });
      res.json(reports);
    } catch (error) {
      console.error('Error getting reports:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
const getreportbyid = async (req, res) => {
    const {id} = req.params;
    try {
        const report = await Report.findById(id);
        res.json(report);
    } catch (error) {
        console.error('Error getting report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { status } = req.body;

        if (!["delivered", "pending", "cancelled", "handled"].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        report.status = status;
        await report.save();

        const updatedReport = await Report.findById(reportId);

        res.json({ report: updatedReport });
    } catch (error) {
        console.error('Error updating report status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        await Report.findByIdAndDelete(reportId);

        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createReport,
    getAllReports,
    updateReportStatus,
    deleteReport,
    getreportbyid,
    getDeliveredReports
};
