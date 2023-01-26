const Model = require('./model')
function add (appointment){
    const myAppointment = new Model(appointment)
    myAppointment.save();
}
async function list(filter){
    const appointments = await Model.find(filter);
    return appointments
}
async function update(id,schedule,date){
    const foundAppointment = await Model.findOne({_id:id})
    foundAppointment.schedule = schedule;
    foundAppointment.date = date;
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