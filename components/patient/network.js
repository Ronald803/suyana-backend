const express           = require('express');
const router            = express.Router();
const controller        = require('./controller')
const responseFunc      = require('../../network/responseFunc')
const {validationJwtRol}= require('../../middlewares/validationJwtRol') 

router.get('/',validationJwtRol(),(req,res)=>{
    const rol = req.user.rol;
    controller.getPatient(req.query,rol)
        .then( (patients)=>{
            responseFunc.success(req,res,patients.length,patients,200)
        } )
        .catch( e=>{
            responseFunc.error(req,res,500,e)
        })
})
router.post('/',validationJwtRol(),(req,res)=>{
    const {name,age,birthday,phone,branch,specialty,diagnosis} = req.body
    controller.addPatient(name,age,birthday,phone,branch,specialty,diagnosis)
        .then( (patient)=>{
            responseFunc.success(req,res,"Paciente añadido correctamente",patient,201)
        })
        .catch( e=>{
            responseFunc.error(req,res,400,e)
        })
})
router.put('/:id',validationJwtRol(),(req,res)=>{
    controller.updatePatient(req.params.id,req.body)
        .then( (updatedPatient)=>{
            responseFunc.success(req,res,"Información de paciente actualizada",updatedPatient,200)
        } )
        .catch( e=>{
            responseFunc.error(req,res,500,e)
        })
})
router.delete('/:id',validationJwtRol(),(req,res)=>{
    controller.deletePatient(req.params.id)
        .then( (deletedPatient)=>{
            responseFunc.success(req,res,"Paciente eliminado",deletedPatient,200)
        } )
        .catch( e=>{
            responseFunc.error(req,res,500,e)
        })
})
module.exports = router;
