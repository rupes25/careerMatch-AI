const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/tokenBlacklist.model");

async function authenticateUser(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication is required." });
    }

    try {
        const blacklistedToken = await tokenBlacklistModel.exists({ token });
        if (blacklistedToken) {
            return res.status(401).json({ message: "Your session has expired. Please log in again." });
        }

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    }
    catch {
        return res.status(401).json({ message: "Your session is invalid. Please log in again." });
    }
}

module.exports = authenticateUser;