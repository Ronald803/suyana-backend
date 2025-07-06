const DoctorModel = require('./doctor.model');

function add(doctor) {
  const newDoctor = new DoctorModel(doctor);
  const doctorSaved = newDoctor.save();
  return doctorSaved;
}
async function list(filter) {
  const doctors = await DoctorModel.find(filter).populate('specialty');
  return doctors;
}

module.exports = { add, list };
