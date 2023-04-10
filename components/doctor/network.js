const express           = require('express');
const router            = express.Router();
const controller        = require('./controller')
const responseFunc      = require('../../network/responseFunc')
const {validationJwtRol}= require('../../middlewares/validationJwtRol') 

router.get('/', validationJwtRol(), (req,res)=>{
    const rol = req.user.rol;
    //console.log({rol});
    controller.getDoctor(req.query,rol)
        .then( (doctors)=>{
            responseFunc.success(req,res,doctors.length,doctors,200)
        } )
        .catch( e=>{
            responseFunc.error(req,res,"Unexpected Error",500,e)
        })
})
router.post('/', validationJwtRol(),(req,res)=>{
    const {name,specialty,branch,availability,phone,address,email,password} = req.body;
    controller.addDoctor(name,specialty,branch,availability,phone,address,email,password)
        .then( (newDoctor)=>{
            responseFunc.success(req,res,"Terapeuta añadido correctamente",newDoctor,201)
        })
        .catch( e=>{
            responseFunc.error(req,res,"Información inválida",400,e)
        })
})
router.put('/:id', validationJwtRol(), (req,res)=>{
    controller.updateDoctor(req.params.id,req.body)
        .then( (updatedDoctor)=>{
            responseFunc.success(req,res,"Información de Terapeuta actualizada correctamente",updatedDoctor,200)
        })
        .catch( e=>{
            responseFunc.error(req,res,"Error interno",500,e)
        })
})
router.delete('/:id', validationJwtRol(), (req,res)=>{
    controller.deleteDoctor(req.params.id)
        .then( (deletedDoctor)=>{
            responseFunc.success(req,res,"Terapeuta dado de baja",deletedDoctor,200)
        })
        .catch( e=>{
            responseFunc.error(req,res,"Error interno",500,e)
        })
})
module.exports = router;