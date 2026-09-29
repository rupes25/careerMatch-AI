const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReportSchema.model");

async function generateInterViewReportController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF is required." });
        }

        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData?.text?.trim();

        if (!resumeText) {
            return res.status(400).json({ message: "Unable to read the uploaded resume PDF." });
        }

        const { selfDescription, jobDescription } = req.body || {};

        if (!jobDescription || !selfDescription) {
            return res.status(400).json({ message: "Self description and job description are required." });
        }

        const interviewReportData = await generateInterviewReport({
            resume: resumeText,
            selfDescription,
            jobDescription,
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interviewReportData,
        });

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport,
        });
    } catch (error) {
        console.error("generateInterViewReportController error:", error);
        return res.status(500).json({
            message: "Unable to generate interview report.",
            error: error.message,
        });
    }
}

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params;

    try {
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport,
        });
    } catch (error) {
        return res.status(500).json({ message: "Unable to fetch interview report." });
    }
}

async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports,
        });
    } catch (error) {
        return res.status(500).json({ message: "Unable to fetch interview reports." });
    }
}

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params;

    try {
        const interviewReport = await interviewReportModel.findById(interviewReportId);

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            });
        }

        if (String(interviewReport.user) !== String(req.user.id)) {
            return res.status(403).json({ message: "You are not authorized to access this resume." });
        }

        const { resume, jobDescription, selfDescription } = interviewReport;
        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        });

        return res.send(pdfBuffer);
    } catch (error) {
        console.error("generateResumePdfController error:", error);
        return res.status(500).json({
            message: "Unable to generate resume PDF.",
            error: error.message,
        });
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController };