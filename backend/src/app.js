const express = require("express");
const authenticationRouter = require("./routes/authentication.routes");
const cookieParser = require("cookie-parser");

const app = express();


app.use(express.json({limit:"10kb"}));
app.use(cookieParser())

app.use("/",authenticationRouter);




module.exports = app;