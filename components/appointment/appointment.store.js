const AppointmentModel = require('./appointment.model');
async function add(appointment) {
  const myAppointment = new AppointmentModel(appointment);
  const newAppointment = await myAppointment.save();
  return newAppointment;
}
async function list(filter) {
  const appointments = await AppointmentModel.find(filter);
  return appointments;
}
async function update(id, doctor, specialty, dateTime) {
  // const foundAppointment = await AppointmentModel.findOne({ _id: id });
  // foundAppointment.doctor = doctor;
  // foundAppointment.specialty = specialty;
  // foundAppointment.dateTime = dateTime;
  // foundAppointment.characteristic = 'modificado';
  // const updatedAppointment = await foundAppointment.save();
  // return updatedAppointment;
}
async function remove(id) {
  // const foundAppointment = await AppointmentModel.findOne({ _id: id });
  // foundAppointment.characteristic = 'eliminado';
  // const deletedAppointment = await foundAppointment.save();
  // return deletedAppointment;
}

module.exports = { add, list, update, remove };
