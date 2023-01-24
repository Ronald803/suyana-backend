const Model = require('./model')
function add (appointment){
    console.log(appointment);
    const myAppointment = new Model(appointment)
    myAppointment.save();
}
async function list(filter){
    const appointments = await Model.find(filter);
    return appointments
}
async function update(id,body){
    console.log(body)
    const foundAppointment = await Model.findOne({_id:id})
    foundAppointment.schedule = body.schedule;
    foundAppointment.characteristic = "modificado";
    const updatedAppointment = await foundAppointment.save();
    return updatedAppointment;
}
module.exports = {add,list,update}