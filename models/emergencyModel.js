const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emergencySchema = new Schema({
    name: String,
    phone: Number,
});

module.exports = mongoose.model('Emergency', emergencySchema);