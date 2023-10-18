const messageModel = require("../models/messageModel")

const createMessage = async (req, res) => {
    const newMessage = new messageModel(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        console.log(error);
    }
}

const getMessageByConversationId = async (req, res) => {
    const {conversationId} = req.params;
    try {
        const messages = await messageModel.find({conversationId});
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createMessage, getMessageByConversationId};