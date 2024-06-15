const CurrentProject = require('../models/CurrentProject');
const User = require('../models/userModel');

async function createCurrentProject(req, res) {
    try {
        const clientId = req.user._id;
        const client = await User.findById(clientId);
        if (!client) {
            throw new Error("Client not found");
        }
        const freelancerId = req.params.freelancerId;
        const freelancer = await User.findById(freelancerId);
        if (!freelancer) {
            throw new Error("Freelancer not found");
        }
        const announcementId = req.body.announcement;
        const currentProject = new CurrentProject({
            client: clientId,
            freelancer: freelancerId,
            announcement: announcementId
        });
        await currentProject.save();
        res.status(201).json({ message: "Current project created successfully", currentProject });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

async function deleteCurrentProject(req, res, next) {
    try {
        const projectId = req.params.projectId;
        const currentProject = await CurrentProject.findById(projectId);
        if (!currentProject) {
            return res.status(404).json({ message: "Current project not found" });
        }
        await CurrentProject.findByIdAndDelete(projectId);
        res.status(200).json({ message: "Current project deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

async function getAllProjects(req, res, next) {
    try {
        const projects = await CurrentProject.find();
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
}

async function getProjectsByUserId(req, res, next) {
    try {
        const userId = req.params.userId;
        const projects = await CurrentProject.find({
            $or: [
                { client: userId },
                { freelancer: userId }
            ]
        });
        res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
}

async function addWorkVersion(req, res) {
    try {
        const projectId = req.params.projectId;
        const content = req.body.content;
        const project = await CurrentProject.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.freelancer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the assigned freelancer can add work versions" });
        }

        const nextVersionNumber = project.workVersions.length + 1;

        if (nextVersionNumber > 3) {
            return res.status(400).json({ message: "Maximum of 3 versions allowed" });
        }

        // Check if the previous version was confirmed
        if (nextVersionNumber > 1) {
            const lastVersion = project.workVersions[project.workVersions.length - 1];
            if (!lastVersion.confirmed) {
                return res.status(400).json({ message: "The previous version must be confirmed before adding a new version" });
            }
        }

        project.workVersions.push({ versionNumber: nextVersionNumber, content });
        await project.save();

        res.status(201).json({ message: "Work version added successfully", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


async function confirmWorkVersion(req, res) {
    try {
        const projectId = req.params.projectId;
        const versionNumber = parseInt(req.params.versionNumber, 10);
        const project = await CurrentProject.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.client.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the client can confirm work versions" });
        }
        const version = project.workVersions.find(v => v.versionNumber === versionNumber);
        if (!version) {
            return res.status(404).json({ message: "Work version not found" });
        }
        version.confirmed = true;
        await project.save();
        res.status(200).json({ message: "Work version confirmed successfully", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

async function updateWorkbyVersion(req, res) {
    try {
        const projectId = req.params.projectId;
        const versionNumber = parseInt(req.params.versionNumber, 10);
        const content = req.body.content;
        const project = await CurrentProject.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if (project.freelancer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the assigned freelancer can update work versions" });
        }
        const version = project.workVersions.find(v => v.versionNumber === versionNumber);
        if (!version) {
            return res.status(404).json({ message: "Work version not found" });
        }
        version.content = content;
        version.confirmed = false; // Reset confirmation status if the content is updated
        await project.save();
        res.status(200).json({ message: "Work version updated successfully", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

async function markProjectAsDone(req, res) {
    try {
        const projectId = req.params.projectId;
        const project = await CurrentProject.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Only the client or the freelancer can mark the project as done
        if (project.client.toString() !== req.user._id.toString() ) {
            return res.status(403).json({ message: "Only the client can mark the project as done" });
        }

        project.isDone = true;
        await project.save();

        res.status(200).json({ message: "Project marked as done successfully", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    markProjectAsDone,
    createCurrentProject,
    deleteCurrentProject,
    getAllProjects,
    getProjectsByUserId,
    addWorkVersion,
    confirmWorkVersion,
    updateWorkbyVersion
};
