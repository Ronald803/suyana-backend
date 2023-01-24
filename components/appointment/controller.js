const store = require('./store')
function addAppointment(patient,date,schedule,specialty,doctor){
    return new Promise( (resolve,reject)=>{
        if(!patient || !date || !schedule || !specialty|| !doctor){
            return reject('Datos incompletos')
        }
        const appointment = {patient, date,schedule,specialty,doctor,characteristic:"reservado"};
        store.add(appointment);
        resolve(appointment);
    } )
}
function getAppointments(filter){
    return new Promise((resolve,reject)=>{
        resolve(store.list(filter));
    })
}
module.exports = {
    addAppointment, getAppointments
}