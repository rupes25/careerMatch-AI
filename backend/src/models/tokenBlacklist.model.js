const mongoose = require("mongoose");

const tokenBlacklist = new mongoose.Schema({
    type:String,
    required:[true,"Token is required."]
},
{timestamps:true},
)

const tokenBlacklistModel = mongoose.model("blacklistTokens",tokenBlacklist);

module.exports = tokenBlacklistModel