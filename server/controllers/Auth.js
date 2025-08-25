const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// signUp
exports.signUp = async (req, res) => {
    try {

        // data fetch from request ki body
        const { name, email, password, role} = req.body;
        //validation
        if (!name || !email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        //check user already exist or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //entry created DB
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        //return res
        return res.status(200).json({
            success:true,
            message:"User registered successfully", user,
        })
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            meassage: "User cannot be registered, Please try again",
        })
    }

}

//Login
exports.login = async (req, res) => {
    try {
        // get data from req body
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        // user check exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please sign up",
            });
        }

        // password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        // generate jwt token, after password match
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        user.token = token;
        user.password = undefined;

        // create cookies and send response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 din
            httpOnly: true,
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again",
        });
    }
};
