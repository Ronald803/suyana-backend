const PatientModel = require('./patient.model');

function add(patient) {
  const newPatient = new PatientModel(patient);
  const savedUser = newPatient.save();
  return savedUser;
}
async function list(filter) {
  const patients = await PatientModel.find(filter);
  return patients;
}

module.exports = { add, list };
