const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        //unique: true
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followerins: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;