const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    cellphone:{
        type: Number,
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
    dateTime:{
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    },
    characteristic:{
        type: String,
        required: true
    },
})

const model = mongoose.model('Appointment',mySchema)
module.exports = model;