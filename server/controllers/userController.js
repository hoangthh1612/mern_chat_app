const userModel = require("../models/userModel")

const getAllUser = async (req, res) => {

    const users = await userModel.find();
    return res.status(200).json(users);
}

const getUserbyId = async (req, res) => {
    const {userId} = req.query;
    try {
        const user = await userModel.findById(userId);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {getAllUser, getUserbyId};