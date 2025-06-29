const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patients',
    required: [true, 'Patient Id is required'],
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctors',
    required: [true, 'Doctor Id is required'],
  },
  specialtyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty',
    required: [true, 'Specialty Id is required'],
  },
  day: {
    type: String,
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  endHour: {
    type: String,
    required: true,
  },
});

const model = mongoose.model('Appointment', mySchema);
module.exports = model;
