const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    title: String,
    description: String,
    level: Number,
});

module.exports = mongoose.model('Achievement', achievementSchema);

