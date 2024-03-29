const store = require('./store')
function addPatient(name,age,birthday,phone,branch,specialty,diagnosis){
    return new Promise( async (resolve,reject)=>{
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
            characteristic: "active",
            diagnosis: diagnosis || "Sin diagnostico",
            evaluation: ["Pendiente"]
        }
        const newPatient = await store.add(patient)
        resolve({_id: newPatient._id})
    } ) 
}
function getPatient(filter,rol){
    return new Promise( async(resolve,reject)=>{
        const patients = await store.list(filter)
        let arrayOfPatients = [];
        if(rol==="administrador"&&filter.characteristic==="eliminado"){
            resolve(patients)
        } else if (rol!=="administrador"&&filter.characteristic==="eliminado"){
            resolve()
        }
        patients.map( element => {
            if(element.characteristic!=="eliminado"){
                arrayOfPatients.push(element)
            }
        }) 
        resolve(arrayOfPatients)
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