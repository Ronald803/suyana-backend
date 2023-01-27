const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    branch: {
        type: Array,
        required: true
    },
    availability: {
        type: Array,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    patients: {
        type: Array,
        required: true
    },
    observations:{
        type: Array,
        required: true
    },
    characteristic:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    }
})
const model = mongoose.model('Doctor',mySchema)
module.exports = model