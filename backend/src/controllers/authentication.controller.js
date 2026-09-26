const userModel = require("../models/authentication.model")
const bcrypt = require("bcryptjs");
const tokenBlacklistModel = require("../models/tokenBlacklist.model");
const jwt = require("jsonwebtoken")

/
function createToken(user) {
    return jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const cookieOptions = {
    httpOnly: true,
    samesite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000
}

async function registerUser(req, res) {
    const { fName, email, username, password } = req.body;

    // checking for the datas
    if (typeof fName !== 'string' || typeof email !== 'string' || typeof password !== 'string' || typeof username !== 'string' || !fName.trim() || !email.trim() || !password.trim() || !username.trim())
        return res.status(404).json({
            message: "All fields are required in string format."
        })

    try {
        // if user already exists with the username or email.
        const user = await userModel.findOne(
            $or[
            { username }, { email }
            ])

        if (user) {
            return res.status(404).json({
                message: "Username or email already exists."
            })
        }

        // if everything is ok then hash password.
        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            fName,
            email,
            username,
            password: hashedPassword
        });

        // create token

        const token = createToken(user);

        // create cookie.
        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "User registered successfully."
        })
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "User already exists with this email or username." })
        }
        return res.status(500).json({ message: "Internal server error." })
    }
}

async function loginUser(req,res){
    const {email, username, password } = req.body;

    // checking for the datas
    if (typeof email !== 'string' || typeof password !== 'string' || typeof username !== 'string' ||!email.trim() || !password.trim() || !username.trim())
        return res.status(404).json({
            message: "All fields are required in string format."
    })

   try{
     // check whether user exists with this username or email
    const user = await userModel.findOne(
        $or[{email},{username}]
    )

    if(!user){
        return res.status(404).json({message:"Invalid login credentials."})
    }

    // if user exists check for password.
    
    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword){
         return res.status(404).json({message:"Invalid login credentials."})
    }

    // if all thing is good return token 
    const token = createToken(user);

    res.cookie("token",token,cookieOptions);

    return res.status(200).json({
        message:"Logged in successfully.",
        user:{
            fullName:user.fName,
            email:user.email,
            username:user.username
        }
    })
   }
   catch(err){
    return res.status(500).json({ message: "Internal server error." })
   }
}


async function logoutUser(req,res){
    try{
        const token = req.body.token;

        if(token){
            await tokenBlacklistModel.create({token});
        }

        res.clearCookie("token")

        return res.status(200).json({
            message: "User logout successfully."
        })

    }
    catch(err){
        return res.status(500).json({ message: "Internal server error." })
    }

}










module.exports = {registerUser,loginUser,logoutUser}