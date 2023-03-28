const bcryptjs  = require('bcryptjs')
const store     = require('./store')
const jwt       = require('jsonwebtoken')

function addDoctor(name,specialty,branch,availability,phone,address,email,password){
    return new Promise( async(resolve,reject)=>{
        if(!name || !specialty || !branch || !availability || !phone || !address || !email || !password){
            reject("Datos incompletos");
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
            characteristic: "activo",
            email,
            password: encryptPassword,
            rol: "moderador"
        };
        //_________________saving in data base_________________
        const doctorSaved = await store.add(doctor);
        //_________________generating jwtoken__________________
        const payload   = {uid: doctorSaved._id}
        const token     = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn:'4h'})        
        resolve({
            name:   doctorSaved.name,
            rol:    doctorSaved.rol,
            token
        });
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