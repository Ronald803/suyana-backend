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
module.exports = {add,list}