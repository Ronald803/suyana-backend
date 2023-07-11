const bcryptjs  = require('bcryptjs')
const store     = require('./store')
const jwt       = require('jsonwebtoken')

function addDoctor(name,specialty,branch,availability,phone,address,email,password){
    return new Promise( async(resolve,reject)=>{
        try {
            if(!name || !specialty || !branch || !availability || !phone || !address || !email || !password){
                return reject("Datos incompletos");
            }
            //___________________encrypting password________________
            const salt = bcryptjs.genSaltSync();
            const encryptPassword = bcryptjs.hashSync( password, salt );
            //______________________________________________________
            const doctor = {
                name,
                specialty,
                branch,
                availability,
                phone,
                address,
                patients: [],
                observatios: [],
                characteristic: "inactivo",
                email,
                password: encryptPassword,
                rol: "moderador"
            };
            //_________________saving in data base_________________
            const doctorSaved = await store.add(doctor);
            //_________________generating jwtoken__________________
            //const payload   = {uid: doctorSaved._id}
            //const token     = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn:'4h'})        
            resolve({
                name:   doctorSaved.name,
                notice: "Favor esperar a que un administrador habilite tu cuenta, se te notificará a tu correo electrónico"
                //rol:    doctorSaved.rol,
                //token
            });
        } catch (error) {
            return reject(error)
        }
        
    } )

}
function getDoctor(filter,rol){
    return new Promise( async (resolve,reject)=>{
        const users = await store.list(filter)
        let arrayOfUsers = [];
        if(rol==="administrador"&&filter.characteristic==="eliminado"){
            resolve(users)
        } else if (rol!=="administrador"&&filter.characteristic==="eliminado"){
            resolve()
        }
        users.map( element => {
            if(element.characteristic!=="eliminado"){
                arrayOfUsers.push(element)
            }
        })    
        resolve(arrayOfUsers)
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