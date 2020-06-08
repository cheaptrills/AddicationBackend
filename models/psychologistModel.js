const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const psychologistSchema = new Schema({
    name: String,
    specialisation: String,
    street: String,
    number: Number,
    city: String ,
    phone: Number,
});

module.exports = mongoose.model('Psychologist', psychologistSchema);