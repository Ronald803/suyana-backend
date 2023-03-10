const express = require('express');
const router = express.Router();
const controller = require('./controller')
const response = require('../../network/response')

router.get('/',(req,res)=>{
    controller.getAppointments(req.query)
    .then( (appointments)=>{
        response.success(req,res,appointments.length,appointments,200)
    } )
    .catch( e=>{
        response.error(req,res,"Unexpected Error",500,e)
    })
})
router.post('/',(req,res)=>{
    const {patient,date,schedule,specialty,doctor} = req.body
    controller.addAppointment(patient,date,schedule,specialty,doctor)
     .then((appointment)=>{
         response.success(req,res,"Cita médica añadida correctamente",appointment,201)
     })
     .catch( e=>{
         response.error(req,res,e,400,e)
     })
})
router.put('/:id',(req,res)=>{
    controller.updateAppointment(req.params.id,req.body.schedule,req.body.date)
        .then( (updatedAppointment)=>{
            response.success(req,res,"Cita médica actualizada correctamente",updatedAppointment,200)
        } )
        .catch(e=>{
            response.error(req,res,e,500,e)
        })
})
router.delete('/:id',(req,res)=>{
    controller.deleteAppointment(req.params.id)
        .then( (deletedAppointment)=>{
            response.success(req,res,"Cita médica eliminada correctamente",deletedAppointment,200)
        } )
        .catch( e=>{
            response.error(req,res,e,500,e)
        }) 
    
    
})

module.exports = router;