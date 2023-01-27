const express = require('express');
const router = express.Router();
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', (req,res)=>{
    controller.getDoctor(req.query)
        .then( (doctors)=>{
            response.success(req,res,doctors.length,doctors,200)
        } )
        .catch( e=>{
            response.error(req,res,"Unexpected Error",500,e)
        })
})
router.post('/', (req,res)=>{
    const {name,specialty,branch,availability,phone,address,email,password} = req.body;
    controller.addDoctor(name,specialty,branch,availability,phone,address,email,password)
        .then( (newDoctor)=>{
            response.success(req,res,"Terapeuta añadido correctamente",newDoctor,201)
        })
        .catch( e=>{
            response.error(req,res,"Información inválida",400,e)
        })
})
router.put('/:id', (req,res)=>{
    controller.updateDoctor(req.params.id,req.body)
        .then( (updatedDoctor)=>{
            response.success(req,res,"Información de Terapeuta actualizada correctamente",updatedDoctor,200)
        })
        .catch( e=>{
            response.error(req,res,"Error interno",500,e)
        })
})
router.delete('/:id', (req,res)=>{
    controller.deleteDoctor(req.params.id)
        .then( (deletedDoctor)=>{
            response.success(req,res,"Terapeuta dado de baja",deletedDoctor,200)
        })
        .catch( e=>{
            response.error(req,res,"Error interno",500,e)
        })
})
module.exports = router;