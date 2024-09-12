const bcrypt = require('bcrypt');
const User = require('../models/user');
const sendVerificationEmail = require('../utils/sendverificationemail')
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken');
const maxage = 3 * 24 * 60 * 60 * 1000;

const create_token = (email, userID) => {
    return jwt.sign({ email, userID }, process.env.JWT_KEY, { expiresIn: maxage })
}

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide both email and password"
            })
        }

        const hashedpassword = (await bcrypt.hash(password, 10)).toString();

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false }).toString();

        const user = await User.create({
            email,
            password: hashedpassword,
            OTP : otp
        })

        res.cookie("JWT", create_token(email, user.id), {
            maxage,
            secure: true,
            sameSite: "None",
        });

        try {
            await sendVerificationEmail(email, otp);
            console.log("Email sent");
        } catch (error) {
            console.log("Error in email sending: ", error);
            return res.status(500).json({
                success: false,
                message: "Error in sending verification email",
            });
        }

        res.status(200).json({
            success: true,
            message: "user created successfully",
            user: user,
            otp
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "cannot signin please check Email and Password"
        });
    }
};

exports.verifyotp = async(req,res)=>{
    const { otp } = req.body;

    try {
        // Ensure the asynchronous call is awaited
        const user = await User.findOne({ OTP : otp });

        // If no user is found, return an error response
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code, please check it",
            });
        }

        // Clear the OTP field after verification
        user.OTP = undefined;
        await user.save();

        // Return a success response without sending the password
        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            user: {
                ...user._doc,
                password: undefined, // Remove password from the response
            },
        });
    } catch (error) {
        console.log(error);
        // Handle any server-side errors
        res.status(500).json({
            success: false,
            message: "Error in OTP verification",
        });
    }
}

exports.login = async(req,res)=>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide both email and password"
            })
        }


        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success : false,
                message : "user with the given credentails are not present please signup"
            })
        }

        const auth = bcrypt.compare(password, user.password);

        if(!auth){
            return res.status(400).json({
                success : false,
                message : "Incorrect password"
            })
        }

        res.cookie("JWT", create_token(email, user.id), {
            maxage,
            secure: true,
            sameSite: "None",
        });

        res.status(200).json({
            success: true,
            message: "Login successfull",
            user: {
                id : user.id,
                email : user.email,
                profilesetup : user.profilesetup,
                firstname : user.firstname,
                lastname : user.lastname,
                image : user.image,
                color : user.color
            },
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "cannot signin please check Email and Password"
        });
    }
}