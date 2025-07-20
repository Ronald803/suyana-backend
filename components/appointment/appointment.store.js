const AppointmentModel = require('./appointment.model');

async function add(appointment) {
  const myAppointment = new AppointmentModel(appointment);
  const newAppointment = await myAppointment.save();
  return newAppointment;
}
async function list(filter) {
  const appointments = await AppointmentModel.find(filter)
    .populate({ path: 'patient', select: 'name' })
    .populate({
      path: 'doctor',
      select: 'name specialty',
      populate: { path: 'specialty', select: 'name' },
    });
  return appointments;
}

async function remove(appointmentId) {
  const deletedAppointment =
    await AppointmentModel.findByIdAndDelete(appointmentId);
  return deletedAppointment;
}

module.exports = { add, list, remove };
