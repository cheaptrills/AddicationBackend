const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema({
    created: Date,
    title: String,
    entry: String,
    userID: String,
});

module.exports = mongoose.model('Diary', diarySchema);