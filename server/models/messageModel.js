const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        conversationId: {
            type: String
        }, 
        sender: {
            type: String
        },
        text: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;