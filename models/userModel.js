
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    drug: Number,
    taskIDs:[],
    achievementIDs:[],
});

module.exports = mongoose.model('User', userSchema);