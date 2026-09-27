require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database.js")


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectToDB();
})