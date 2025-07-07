const appointmentStore = require('./appointment.store');

const addAppointment = async (newAppointment) => {
  const { patient, doctor, startHour, endHour, day } = newAppointment;
  if (!patient || !doctor || !startHour || !endHour || !day) {
    throw new Error('Datos incompletos');
  }
  const appointment = {
    patient,
    doctor,
    startHour,
    endHour,
    day,
  };
  const appointmentSaved = await appointmentStore.add(appointment);
  return appointmentSaved;
};

const getAppointments = async (filter) => {
  const appointments = await appointmentStore.list(filter);
  return appointments;
};

module.exports = {
  addAppointment,
  getAppointments,
};
