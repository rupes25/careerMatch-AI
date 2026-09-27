const userModel = require("../models/authentication.model")
const bcrypt = require("bcryptjs");
const tokenBlacklistModel = require("../models/tokenBlacklist.model");
const jwt = require("jsonwebtoken");

function createToken(user) {
    return jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/"
}

async function registerUser(req, res) {
    const { fName, email, username, password } = req.body || {};

    if ([fName, email, username, password].some(value => typeof value !== "string" || !value.trim())) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    try {
        const existingUser = await userModel.findOne({
            $or: [{ username: normalizedUsername }, { email: normalizedEmail }]
        });

        if (existingUser) {
            return res.status(409).json({ message: "Username or email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            fName: fName.trim(),
            email: normalizedEmail,
            username: normalizedUsername,
            password: hashedPassword
        });

        const token = createToken(user);
        res.cookie("token", token, cookieOptions);

        return res.status(201).json({
            message: "User registered successfully.",
            user: { id: user._id, name: user.fName, email: user.email, username: user.username }
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "User already exists with this email or username." })
        }
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Internal server error." })
    }
}

async function loginUser(req, res) {
    const { usernameOrEmail, password } = req.body || {};

    if (typeof usernameOrEmail !== "string" || !usernameOrEmail.trim() || typeof password !== "string" || !password) {
        return res.status(400).json({ message: "Username/email and password are required." });
    }

    const identifier = usernameOrEmail.trim().toLowerCase();

    try {
        const user = await userModel.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid login credentials." });
        }

        const token = createToken(user);
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "Logged in successfully.",
            user: { id: user._id, name: user.fName, email: user.email, username: user.username }
        });
    }
    catch {
        return res.status(500).json({ message: "Internal server error." });
    }
}

async function logoutUser(req, res) {
    try{
        const token = req.cookies?.token;

        if(token){
            await tokenBlacklistModel.create({token});
        }

        res.clearCookie("token", cookieOptions);

        return res.status(200).json({
            message: "User logout successfully."
        })

    }
    catch(err){
        return res.status(500).json({ message: "Internal server error." })
    }

}

async function currentUser(req, res) {
    try{
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User account was not found." });
        }

        return res.status(200).json({
            message: "Current user details.",
            user: { id: user._id, name: user.fName, email: user.email, username: user.username }
        });
    }

    catch(err){
        return res.status(500).json({
            message:"Unable to find the current user details."
        })
    }
}










module.exports = {registerUser,loginUser,logoutUser,currentUser}