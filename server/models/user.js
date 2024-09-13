const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    profilesetup: {
        type: Boolean,
        default: false
    },

    OTP : {
        type : String
    }

});

const User = mongoose.model("User", userSchema);

module.exports = User;
