const store = require('./store')
const storeDoctor = require('../doctor/store')
const storePatient = require('../patient/store')
const timeTranslator = require('../../helpers/timeTranslator')
//const validate = require('../../helpers/validate')

function addAppointment(patient,doctor,specialty,start,end,branch){
    return new Promise( async(resolve,reject)=>{
        if(!patient || !doctor || !specialty|| !start || !end || !branch){return reject('Datos incompletos')}
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
        /**
         * TODO: CHECK AVAILABILITY
         */
        //____________________________________________________________________
        const appointment = {patient,doctor,specialty,start,end,branch};
        const appointmentSaved = await store.add(appointment);
        resolve({_id: appointmentSaved._id});
    } )
}
function getAppointments(filter,rol){
    return new Promise(async(resolve,reject)=>{
        const appointments = await store.list(filter);
        let arrayOfAppointments = [];
        if(rol==="administrador"&&filter.characteristic==="eliminado"){
            resolve(appointments)
        } else if (rol!=="administrador"&&filter.characteristic==="eliminado"){
            resolve()
        }
        appointments.map( element => {
            if(element.characteristic!=="eliminado"){
                arrayOfAppointments.push(element)
            }
        })
        resolve(arrayOfAppointments);
    })
}
function updateAppointment(id,body){
    return new Promise( async(resolve,reject)=>{
        if(!id || !body){ return reject ("Incomplete data")}
        //__________________ desestructurando _______________________________
        const {doctor,specialty,dateTime} = body
        console.log({doctor},{specialty},{dateTime});
        //__________________ checking availability __________________________
        const appoint = await store.list({_id:id})
        if(appoint.length===0){return reject("Datos incorrectos")}
        const appointments = await store.list({dateTime,"specialty": appoint[0].specialty})
        let taken = appointments.some(function(element){return element.characteristic != "eliminado"})
        if(taken){return reject('No se puede hacer el cambio, esa fecha y horario ya están ocupados')}
        //___________________________________________________________________
        const updated = await store.update(id,doctor,specialty,dateTime)
        resolve(updated)
    } )
}
function deleteAppointment(id){
    return new Promise( async (resolve,reject)=>{
        if(!id){ return reject("Id inválido")}
        //__________________ checking appointment____________________________
        const appoint = await store.list({_id:id})
        if(appoint.length==0){return reject("Id-inválido")}
        //__________________ update sessions ________________________________
        const foundDoctor = await storeDoctor.list({name:appoint[0].doctor})
        //console.log(appoint[0]);
        const index = foundDoctor[0].patients.findIndex(element=>{return element.name==appoint[0].name})
        storeDoctor.updateSessions(foundDoctor[0]._id,index,"subtract")
        //___________________________________________________________________
        const deleted = await store.remove(id)
        resolve(deleted)
    } )
}

module.exports = {
    addAppointment, getAppointments, updateAppointment, deleteAppointment
}
