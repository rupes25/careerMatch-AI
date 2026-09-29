const express = require("express");
const authenticateUser = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/file.middleware");
const interviewController = require("../controllers/interview.controller");

const interviewRouter = express.Router();

interviewRouter.post("/", authenticateUser, upload.single("resume"), interviewController.generateInterViewReportController);
interviewRouter.get("/report/:interviewId", authenticateUser, interviewController.getInterviewReportByIdController);
interviewRouter.get("/", authenticateUser, interviewController.getAllInterviewReportsController);
interviewRouter.post("/resume/pdf/:interviewReportId", authenticateUser, interviewController.generateResumePdfController);

module.exports = interviewRouter;