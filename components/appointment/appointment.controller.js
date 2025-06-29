const appointmentStore = require('./appointment.store');
const storeDoctor = require('../doctor/store');
const storePatient = require('../patient/store');
const timeTranslator = require('../../helpers/timeTranslator');
//const validate = require('../../helpers/validate')

const addAppointment = async (newAppointment) => {
  const { patientId, doctorId, specialtyId, startHour, endHour, day } =
    newAppointment;
  if (
    !patientId ||
    !doctorId ||
    !specialtyId ||
    !startHour ||
    !endHour ||
    !day
  ) {
    return reject('Datos incompletos');
  }
  const appointment = {
    patientId,
    doctorId,
    specialtyId,
    startHour,
    endHour,
    day,
  };
  const appointmentSaved = await appointmentStore.add(appointment);
  resolve({ _id: appointmentSaved._id });
};

const getAppointments = async (filter) => {
  const appointments = await appointmentStore.list(filter);
  return appointments;
};

function updateAppointment(id, body) {
  // return new Promise( async(resolve,reject)=>{
  //     if(!id || !body){ return reject ("Incomplete data")}
  //     //__________________ desestructurando _______________________________
  //     const {doctor,specialty,dateTime} = body
  //     console.log({doctor},{specialty},{dateTime});
  //     //__________________ checking availability __________________________
  //     const appoint = await store.list({_id:id})
  //     if(appoint.length===0){return reject("Datos incorrectos")}
  //     const appointments = await store.list({dateTime,"specialty": appoint[0].specialty})
  //     let taken = appointments.some(function(element){return element.characteristic != "eliminado"})
  //     if(taken){return reject('No se puede hacer el cambio, esa fecha y horario ya están ocupados')}
  //     //___________________________________________________________________
  //     const updated = await store.update(id,doctor,specialty,dateTime)
  //     resolve(updated)
  // } )
}
function deleteAppointment(id) {
  // return new Promise( async (resolve,reject)=>{
  //     if(!id){ return reject("Id inválido")}
  //     //__________________ checking appointment____________________________
  //     const appoint = await store.list({_id:id})
  //     if(appoint.length==0){return reject("Id-inválido")}
  //     //__________________ update sessions ________________________________
  //     const foundDoctor = await storeDoctor.list({name:appoint[0].doctor})
  //     //console.log(appoint[0]);
  //     const index = foundDoctor[0].patients.findIndex(element=>{return element.name==appoint[0].name})
  //     storeDoctor.updateSessions(foundDoctor[0]._id,index,"subtract")
  //     //___________________________________________________________________
  //     const deleted = await store.remove(id)
  //     resolve(deleted)
  // } )
}

module.exports = {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
