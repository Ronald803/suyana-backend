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
function updateAppointment(id,body){
    return new Promise( async(resolve,reject)=>{
        if(!id || !body){
            reject ("Incomplete data");
            return false
        }
        const updated = await store.update(id, body)
        resolve(updated)
    } )
}
module.exports = {
    addAppointment, getAppointments, updateAppointment
}