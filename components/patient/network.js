const express = require('express');
const router = express.Router();
const controller = require('./controller')
const response = require('../../network/response')

router.get('/',(req,res)=>{
    controller.getPatient(req.query)
        .then( (patients)=>{
            response.success(req,res,patients.length,patients,200)
        } )
        .catch( e=>{
            response.error(req,res,"Unexpected Error",500,e)
        })
})
router.post('/',(req,res)=>{
    const {name,age,birthday,phone,branch,specialty,diagnosis} = req.body
    controller.addPatient(name,age,birthday,phone,branch,specialty,diagnosis)
        .then( (patient)=>{
            response.success(req,res,"Paciente añadido correctamente",patient,201)
        })
        .catch( e=>{
            response.error(req,res,"Información inválida",400,e)
        })
})
router.put('/:id',(req,res)=>{
    controller.updatePatient(req.params.id,req.body)
        .then( (updatedPatient)=>{
            response.success(req,res,"Información de paciente actualizada",updatedPatient,200)
        } )
        .catch( e=>{
            response.error(req,res,"Error interno",500,e)
        })
})
router.delete('/:id',(req,res)=>{
    controller.deletePatient(req.params.id)
        .then( (deletedPatient)=>{
            response.success(req,res,"Paciente eliminado",deletedPatient,200)
        } )
        .catch( e=>{
            response.error(req,res,"Error interno",500,e)
        })
})
module.exports = router;
