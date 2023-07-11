const { response , request } = require('express');
const jwt = require('jsonwebtoken')
const Model = require('../components/doctor/model')
const responseFunc = require('../network/responseFunc')

const validationJwtRol = (rol)=>{
    return async (req=request,res=response,next)=>{
        const token = req.header('xtoken')
        if(!token){
            return responseFunc.error(req,res,401,"No hay token")
        }
        try{
            const { uid } = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
            const user = await Model.findById(uid);
            if(!user || user.characteristic==='eliminado'){
                return responseFunc.error(req,res,401,"Usuario Inhabilitado")
            }
            if(rol && user.rol !== rol){
                return responseFunc.error(req,res,401,"No tienes permiso para esta operación")
            }
            req.user = user;
            next()
        } catch(error){
            responseFunc.error(req,res,401,"Algo salió mal")
        }
    }
}
module.exports = {
    validationJwtRol
}