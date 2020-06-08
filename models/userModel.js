const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    drug: Number,
    taskIDs:[],
    achievementIDs:[],
});

module.exports = mongoose.model('User', userSchema);