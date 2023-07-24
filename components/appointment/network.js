const express           = require('express');
const router            = express.Router();
const controller        = require('./controller')
const responseFunc      = require('../../network/responseFunc')
const {validationJwtRol}= require('../../middlewares/validationJwtRol') 

//08:00 a 21:00

router.get('/',validationJwtRol(),(req,res)=>{
    const rol = req.user.rol;
    //console.log({rol});
    controller.getAppointments(req.query,rol)
    .then( (appointments)=>{
        responseFunc.success(req,res,appointments.length,appointments,200)
    } )
    .catch( e=>{
        responseFunc.error(req,res,500,e)
    })
})
router.post('/',validationJwtRol(),(req,res)=>{
    const {name,cellphone,doctor,specialty,date,time,branch} = req.body
    controller.addAppointment(name,cellphone,doctor,specialty,date,time,branch)
     .then((appointment)=>{
         responseFunc.success(req,res,"Cita médica añadida correctamente",appointment,201)
     })
     .catch( e=>{
         responseFunc.error(req,res,400,e)
     })
})
router.put('/:id',validationJwtRol(),(req,res)=>{
    controller.updateAppointment(req.params.id,req.body)
        .then( (updatedAppointment)=>{
            responseFunc.success(req,res,"Cita médica actualizada correctamente",updatedAppointment,200)
        } )
        .catch(e=>{
            responseFunc.error(req,res,500,e)
        })
})
router.delete('/:id',validationJwtRol(),(req,res)=>{
    controller.deleteAppointment(req.params.id)
        .then( (deletedAppointment)=>{
            responseFunc.success(req,res,"Cita médica eliminada correctamente",deletedAppointment,200)
        } )
        .catch( e=>{
            responseFunc.error(req,res,500,e)
        }) 
    
    
})

module.exports = router;