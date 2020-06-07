const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    description: String,
    drugs: Number,
    difficulty: Number,
    level: Number,
    items:{
        type: [],
        required: false,
    }
});

module.exports = mongoose.model('Task', taskSchema);

