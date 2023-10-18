const conversationModel = require("../models/conversationModel");

const createConversation = async (req, res) => {
    const {senderId, receiverId} = req.body;
    const newConversation = new conversationModel({
        members: [senderId, receiverId]
    })

    try {
        const savedConversation = await newConversation.save();
        res.status(201).json(savedConversation);
    } catch (error) {
        console.log(error);
    }
}

const getConversationByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
        const conversations = await conversationModel.find({
            members: {$in : [userId]}
        })
        res.status(200).json(conversations);
    } catch (error) {
        
    }
}

const getConversation = async (req, res) => {
    const {firstUserId, secondUserId} = req.params;
    try {
        const conversation = await conversationModel.findOne({
            members: {$all: [firstUserId, secondUserId]}
        })
        res.status(200).json(conversation);    
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createConversation, getConversationByUserId, getConversation};