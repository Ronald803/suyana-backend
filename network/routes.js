const appointment = require('../components/appointment/network')
const patient = require('../components/patient/network')
const doctor = require('../components/doctor/network')
const auth = require('../components/auth/network')

const routes = function(server){
    server.use('/api/appointment',appointment);
    server.use('/api/patient',patient);
    server.use('/api/doctor',doctor);
    server.use('/api/auth', auth)
    server.use('/api/specialty',()=>{
        console.log('esta es una petición a especialidad')
    })
}

module.exports = routes