const Model = require('./model')
function add (appointment){
    console.log(appointment);
    const myAppointment = new Model(appointment)
    myAppointment.save();
}
module.exports = {add}