const store = require('./store')
function addDoctor(name,specialty,branch,availability,phone,address){
    return new Promise( (resolve,reject)=>{
        if(!name || !specialty || !branch || !availability || !phone || !address){
            reject("Datos incompletos");
        }
        const doctor = {
            name,
            specialty,
            branch,
            availability,
            phone,
            address,
            patients: [],
            observatios: [],
            characteristic: "activo"
        };
        store.add(doctor);
        resolve(doctor);
    } )

}
function getDoctor(filter){
    return new Promise( (resolve,reject)=>{
        resolve(store.list(filter))
    } )
}
function updateDoctor(id,body){
    return new Promise( async (resolve,reject)=>{
        if(!id || !body){
            reject("Incomplete Data")
            return false
        }
        const updatedDoctor = await store.update(id,body)
        resolve(updatedDoctor)
    } )
}
function deleteDoctor(id){
    return new Promise( async(resolve,reject)=>{
        if(!id){
            reject("Incomplete Data");
            return false;
        }
        const deletedDoctor = await store.remove(id)        
        resolve(deletedDoctor)
    } )
}
module.exports = { addDoctor,getDoctor,updateDoctor,deleteDoctor}