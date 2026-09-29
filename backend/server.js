require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database.js");

const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await connectToDB();
});