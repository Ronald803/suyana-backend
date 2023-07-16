const Model = require('./model')

function add (patient){
    console.log(patient);
    const newPatient = new Model(patient)
    const savedUser = newPatient.save();
    return savedUser
}
async function list(filter){
    const patients = await Model.find(filter)
    return patients
}
async function update(id,body){
    const foundPatient = await Model.findById(id)
    foundPatient.age = body.age;
    foundPatient.diagnosis = body.diagnosis;
    foundPatient.evaluation.push(body.evaluation);
    foundPatient.branch = body.branch;
    foundPatient.characteristic = "modificado";
    const updatedPatient = await foundPatient.save();
    return updatedPatient
}
async function remove (id){
    const foundPatient = await Model.findById(id);
    foundPatient.characteristic = "eliminado";
    const deletedPatient = await foundPatient.save();
    return deletedPatient
}
module.exports = {add,list,update,remove}