const Report = require('../models/Report');

const createReport = async (req, res) => {
    try {
        const { about, elementReported, description } = req.body;
        const reporter = req.user._id;
        const reported = req.params.reportedId;

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

const updateReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }

        report.status = 'handled';
        await report.save();

        res.json({ message: 'Report status updated successfully' });
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
    deleteReport
};
