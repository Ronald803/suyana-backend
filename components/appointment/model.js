const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    patient:{
        type: String,
        required: true
    },
    doctor:{
        type: String,
        required: true
    },
    specialty:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    schedule:{
        type: String,
        required: true
    },
    characteristic:{
        type: String,
        required: true
    },
})

const model = mongoose.model('Appointment',mySchema)
module.exports = model;