const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const messageSchema = mongoose.Schema(
    {
        parent: {
        type: String,
        required: false,
        },

        content: {
            type: String,
            required : true,
        },
        userid: {
            type: String,
            required : true,
            default: 0,
        },
        date: {
            type: Date,
            required : true,
            default: 0,
        },
    }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;