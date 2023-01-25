const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true    
    },
    specialty: {
        type: Array,
        required: true
    },
    characteristic:{
        type: String,
        required: true
    },
    diagnosis:{
        type: String,
        required: true
    },
    evaluation: {
        type: Array,
        required: true
    },
    branch:{
        type: String,
        required: true
    }
})

const model = mongoose.model('Patient',mySchema)
module.exports = model;