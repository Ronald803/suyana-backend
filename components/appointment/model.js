const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  sessionObjective: {
    type: String,
    default: 'Pendiente...'
  },
  behavior: {
    type: String,
    default: 'Pendiente...'
  },
  objective: {
    type: String,
    default: 'Pendiente...'
  },
  homework: {
    type: String,
    default: 'Pendiente...'
  }
}, { _id: false })

const mySchema = new Schema({
  patient: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  characteristic: {
    type: String,
    default: 'created'
  },
  report: {
    type: reportSchema,
    default: {}
  }
})

const model = mongoose.model('Appointment', mySchema)
module.exports = model;
