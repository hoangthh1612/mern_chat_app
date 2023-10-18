const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');


const userRegister = async (req, res) => {
    const {username, email, password} = req.body;
    const existedUser = await userModel.findOne({email});
    if(existedUser) res.status(400).json("User already existed");
    
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({username, email, password: hashedPass});  
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log(err);
    }  
}

const loginUser = async (req, res) => {
    const {email} = req.body;
    const user = await userModel.findOne({email});

    if(!user) return res.status(404).json({message: "User not found"});
    const validPassword = await bcrypt.compare(req.body.password, user?.password);
    if(!validPassword) return res.status(400).json("Wrong password");

    const {password, ...others} = user._doc;

    res.status(200).json(others);

}

module.exports = {userRegister, loginUser};