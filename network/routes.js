const appointment = require('../components/appointment/network')
const routes = function(server){
    server.use('/api/appointment',appointment);
    server.use('/api/patient',()=>{
        console.log('esta es una petición a información de paciente')
    });
    server.use('/api/doctor',()=>{
        console.log('esta es una petición a información de doctor')
    })
    server.use('/api/specialty',()=>{
        console.log('esta es una petición a especialidad')
    })
}

module.exports = routes