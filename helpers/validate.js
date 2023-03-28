const jwt = require('jsonwebtoken')
const storeDoctor = require('../components/doctor/store')

async function jsonWebToken(token,array){
    if(!token){ return "No hay token en la petición"}
    try{
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        const user = await storeDoctor.list({_id: uid})
        const permission = array.some(element=>{
            return element==user[0].rol
        })
        if(permission){
            return user
        } else {
            return false
        }
    } catch(e){
        return false   
    }

    
}

module.exports = { jsonWebToken }