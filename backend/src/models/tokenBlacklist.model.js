const mongoose = require("mongoose");

const tokenBlacklist = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required."],
        unique: true,
    },
},
{timestamps:true},
)

const tokenBlacklistModel = mongoose.model("blacklistTokens",tokenBlacklist);

module.exports = tokenBlacklistModel