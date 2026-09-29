const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authenticationRouter = require("./routes/authentication.routes");
const interviewRouter = require("./routes/interview.routes");

const app = express();


app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({
	origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
	credentials: true,
}));

app.use("/api", authenticationRouter);
app.use("/api/interview", interviewRouter);




module.exports = app;