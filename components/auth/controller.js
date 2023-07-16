const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const storeDoctor = require('../doctor/store')
function login(email,password){
    return new Promise(async(resolve,reject)=>{
        if(!email || !password){return reject('Incomplete Data')}
        //____________________ checking email exists _________________
        const user = await storeDoctor.list({email})
        if(user.length<1){return reject('Información incorrecta') }
        //____________________ checking user is active ________________
        if(user[0].characteristic=="eliminado" || user[0].characteristic=="inactive"){return reject('Usuario inhabilitado')}
        //____________________ checking password is correct ___________
        const validPassword = bcryptjs.compareSync(password, user[0].password);
        if(!validPassword){return reject('Información incorrecta')}
        //____________________ generating jwtoken _____________________
        const payload = {uid: user[0]._id}
        const token = jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{expiresIn: '4h'})
        resolve({
            name: user[0].name,
            rol: user[0].rol,
            token
        })
    })
}
module.exports = {login}