const appointmentNetwork = require('../components/appointment/appointment.network');
const patientNetwork = require('../components/patient/network');
const staffNetwork = require('../components/doctor/doctor.network');
const authNetwork = require('../components/auth/network');
const specialtyNetwork = require('../components/specialty/specialty.network');

const routes = function (server) {
  server.use('/api/appointment', appointmentNetwork);
  server.use('/api/patient', patientNetwork);
  server.use('/api/staff', staffNetwork);
  server.use('/api/auth', authNetwork);
  server.use('/api/specialty', specialtyNetwork);
  server.use('/api/specialty', () => {
    console.log('esta es una petición a especialidad');
  });
};

module.exports = routes;
