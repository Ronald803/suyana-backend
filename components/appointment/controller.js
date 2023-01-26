const store = require('./store')
const storeDoctor = require('../doctor/store')
const storePatient = require('../patient/store')
function addAppointment(patient,date,schedule,specialty,doctor){
    return new Promise( async(resolve,reject)=>{
        if(!patient || !date || !schedule || !specialty|| !doctor){return reject('Datos incompletos')} 
        //_________________ checking patient information _____________________
        const enablePatient = await storePatient.list({name:patient})
        if(enablePatient.length==0){return reject('No hay registro de ese Paciente')}
        if(enablePatient[0].characteristic=="eliminado"){ return reject('Paciente inhabilitado')}
        //_________________ checking doctor information ______________________
        const enableDoctor = await storeDoctor.list({name:doctor})
        if(enableDoctor.length==0){return reject('No hay registro de ese terapeuta')}
        if(enableDoctor[0].characteristic=="eliminado"){ return reject('Terapeuta inhabilitado')}
        if(enableDoctor[0].specialty!=specialty){return reject(`Lic. ${doctor} no atiende el servicio de ${specialty}`)}
        //_________________ checking availability ____________________________
        const appointments = await store.list({date,specialty,schedule})
        let taken = appointments.some(function(element){return element.characteristic != "eliminado"})
        if(taken){return reject('Fecha ocupada')}
        //____________________________________________________________________
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
function updateAppointment(id,schedule,date){
    return new Promise( async(resolve,reject)=>{
        if(!id || !date || !schedule){ return reject ("Incomplete data")}
        //__________________ checking availability __________________________
        const appoint = await store.list({_id:id})
        const appointments = await store.list({date,schedule,specialty: appoint[0].specialty})
        let taken = appointments.some(function(element){return element.characteristic != "eliminado"})
        if(taken){return reject('No se puede hacer el cambio, esa fecha y horario ya están ocupados')}
        //___________________________________________________________________
        const updated = await store.update(id, schedule,date)
        resolve(updated)
    } )
}
function deleteAppointment(id){
    return new Promise( async (resolve,reject)=>{
        if(!id){ return reject("Id inválido")}
        //__________________ checking appointment____________________________
        const appoint = await store.list({_id:id})
        if(appoint.length==0){return reject("Id-inválido")}
        //___________________________________________________________________
        const deleted = await store.remove(id)
        resolve(deleted)
    } )
}

module.exports = {
    addAppointment, getAppointments, updateAppointment, deleteAppointment
}