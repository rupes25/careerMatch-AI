const express = require("express");
const authenticationRouter = require("./routes/authentication.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();


app.use(express.json({limit:"10kb"}));
app.use(cookieParser());
app.use(cors({
	origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
	credentials: true
}));

app.use("/",authenticationRouter);




module.exports = app;