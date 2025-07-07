const appointmentStore = require('./appointment.store');
const appointmentUtils = require('./appointments.utils');

const addAppointment = async (newAppointment) => {
  const { patient, doctor, startHour, duration, day } = newAppointment;
  if (!patient || !doctor || !startHour || !duration || !day) {
    throw new Error('Datos incompletos');
  }
  const appointment = {
    patient,
    doctor,
    startHour,
    duration,
    day,
  };
  const appointmentSaved = await appointmentStore.add(appointment);
  return appointmentSaved;
};

const getAppointments = async (filter) => {
  const appointments = await appointmentStore.list(filter);
  return appointments;
};

const getSchedule = async () => {
  const appointments = await appointmentStore.list();
  const schedule = appointmentUtils.shapeSchedule(appointments);
  return schedule;
};

module.exports = {
  addAppointment,
  getAppointments,
  getSchedule,
};
