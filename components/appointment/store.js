const Model = require('./model')
async function add (appointment){
    const myAppointment = new Model(appointment)
    const newAppointment = await myAppointment.save();
    return newAppointment
}
async function list(filter){
    const appointments = await Model.find(filter);
    return appointments
}
async function update(id,doctor,specialty,dateTime){
    const foundAppointment = await Model.findOne({_id:id})
    foundAppointment.doctor = doctor;
    foundAppointment.specialty = specialty;
    foundAppointment.dateTime = dateTime;
    foundAppointment.characteristic = "modificado";
    const updatedAppointment = await foundAppointment.save();
    return updatedAppointment;
}
async function remove(id){
    const foundAppointment = await Model.findOne(({_id:id}))
    foundAppointment.characteristic = "eliminado";
    const deletedAppointment = await foundAppointment.save();
    return deletedAppointment;
}


module.exports = {add,list,update,remove}