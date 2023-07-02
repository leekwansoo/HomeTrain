const mongoose = require("mongoose")
const { Schema, model } = mongoose;

const taskSchema = new mongoose.Schema(
    {  
        title: {
            type: String,
            required: true,
            },
                
        date: {
            type: String,
            required : true,
        },

        작성자: {
            type: String,
            required : true,
        },
    }  
)

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;