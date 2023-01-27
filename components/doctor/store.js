const Model = require('./model')

function add(doctor){
    const newDoctor = new Model(doctor);
    newDoctor.save();    
}
async function list(filter){
    const doctors = await Model.find(filter)
    return doctors
}
async function update(id,body){
    const foundDoctor = await Model.findById(id);
    foundDoctor.availability = body.availability;
    foundDoctor.branch = body.branch;
    foundDoctor.characteristic = "modificado";
    const updatedDoctor = foundDoctor.save();
    return updatedDoctor
}
async function remove(id){
    const foundDoctor = await Model.findById(id);
    foundDoctor.characteristic = "elimiinado";
    const deletedDoctor = foundDoctor.save();
    return deletedDoctor
}
async function addPatients(id,object){
    const foundDoctor = await Model.findById(id);
    foundDoctor.patients.push(object);
    foundDoctor.save()
}
async function updateSessions(id,index,operation){
    const foundDoctor = await Model.findById(id);
    let obj = foundDoctor.patients[index]
    operation=="add"? obj.sessions++ : obj.sessions--;
    foundDoctor.patients.splice(index,1);
    foundDoctor.patients.push(obj)
    foundDoctor.save()
}
module.exports = {add,list,update,remove,addPatients,updateSessions}