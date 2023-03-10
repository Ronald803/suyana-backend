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
        //_________________ adding patient and sessions to doctor ____________
        const index = enableDoctor[0].patients.findIndex(element=>{ return element.name==patient })
        if(index==-1){ 
            const object = {name: patient, sessions: 1};
            storeDoctor.addPatients(enableDoctor[0]._id,object)    
        } else {
            storeDoctor.updateSessions(enableDoctor[0]._id,index,"add")
        }
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
        if(taken){return reject('No se puede hacer el cambio, esa fecha y horario ya est??n ocupados')}
        //___________________________________________________________________
        const updated = await store.update(id, schedule,date)
        resolve(updated)
    } )
}
function deleteAppointment(id){
    return new Promise( async (resolve,reject)=>{
        if(!id){ return reject("Id inv??lido")}
        //__________________ checking appointment____________________________
        const appoint = await store.list({_id:id})
        if(appoint.length==0){return reject("Id-inv??lido")}
        //__________________ update sessions ________________________________
        const foundDoctor = await storeDoctor.list({name:appoint[0].doctor})
        const index = foundDoctor[0].patients.findIndex(element=>{return element.name==appoint[0].patient})
        storeDoctor.updateSessions(foundDoctor[0]._id,index,"subtract")
        //___________________________________________________________________
        const deleted = await store.remove(id)
        resolve(deleted)
    } )
}

module.exports = {
    addAppointment, getAppointments, updateAppointment, deleteAppointment
}