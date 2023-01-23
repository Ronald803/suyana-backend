const routes = function(server){
    server.use('/api/medical-appointment',()=>{
        console.log('esta es una petición a sesión médica')
    });
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