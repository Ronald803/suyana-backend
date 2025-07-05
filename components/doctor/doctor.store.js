const DoctorModel = require('./doctor.model');

function add(doctor) {
  const newDoctor = new DoctorModel(doctor);
  const doctorSaved = newDoctor.save();
  return doctorSaved;
}
async function list(filter) {
  const doctors = await DoctorModel.find(filter);
  return doctors;
}
async function update(id, body) {
  // const foundDoctor = await DoctorModel.findById(id);
  // foundDoctor.availability = body.availability;
  // foundDoctor.branch = body.branch;
  // foundDoctor.characteristic = 'modificado';
  // const updatedDoctor = foundDoctor.save();
  // return updatedDoctor;
}
async function remove(id) {
  // const foundDoctor = await DoctorModel.findById(id);
  // foundDoctor.characteristic = 'eliminado';
  // const deletedDoctor = foundDoctor.save();
  // return deletedDoctor;
}
async function addPatients(id, object) {
  // const foundDoctor = await DoctorModel.findById(id);
  // foundDoctor.patients.push(object);
  // foundDoctor.save();
}
async function updateSessions(id, index, operation) {
  // //console.log({id},{index},{operation});
  // const foundDoctor = await DoctorModel.findById(id);
  // let obj = foundDoctor.patients[index];
  // operation == 'add' ? obj.sessions++ : obj.sessions--;
  // foundDoctor.patients.splice(index, 1);
  // foundDoctor.patients.push(obj);
  // foundDoctor.save();
}
module.exports = { add, list, update, remove, addPatients, updateSessions };
