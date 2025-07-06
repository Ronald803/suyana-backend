const DoctorModel = require('./doctor.model');

function add(doctor) {
  const newDoctor = new DoctorModel(doctor);
  const doctorSaved = newDoctor.save();
  return doctorSaved;
}
async function list(filter, exclude = '') {
  const doctors = await DoctorModel.find(filter, exclude).populate('specialty');
  return doctors;
}

module.exports = { add, list };
