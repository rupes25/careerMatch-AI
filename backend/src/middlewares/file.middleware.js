const multer = require("multer");

// file ko save krne ke liye
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:3*1024*1024 //3MB
    }
})

module.exports = upload;

