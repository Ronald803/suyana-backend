const store = require('./store')
function addPatient(name,age,birthday,phone,branch,specialty,diagnosis){
    return new Promise( (resolve,reject)=>{
        if(!name || !age || !birthday || !phone || !branch){
            return reject('Datos incompletos');
        }
        const patient= {
            name,
            age,
            birthday,
            phone,
            branch,
            specialty: specialty || ["fisioterapia","psicología","fonoaudiología","psicopedagogía","terapia ocupacional"],
            characteristic: "registrado",
            diagnosis: diagnosis || "Sin diagnostico",
            evaluation: ["pendiente","pendiente",45689]
        }
        store.add(patient)
        resolve(patient)
    } ) 
}
function getPatient(filter){
    return new Promise( (resolve,reject)=>{
        resolve(store.list(filter))
    } )
}
function updatePatient(id,body){
    return new Promise( async(resolve,reject)=>{
        if(!id || !body){
            reject ("Incomplete data")
            return false
        }
        const updated = await store.update(id,body)
        resolve (updated)
    } )
    
}
function deletePatient(id){
    return new Promise( async(resolve,reject)=>{
        if(!id){
            reject("Incomplete data")
            return false
        }
        const deleted = await store.remove(id)
        resolve(deleted)
    })
}
module.exports = {addPatient,getPatient,updatePatient,deletePatient}