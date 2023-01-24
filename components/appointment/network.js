const express = require('express');
const router = express.Router();
const controller = require('./controller')

router.get('/',(req,res)=>{
    console.log(req.query)
    controller.getAppointments(req.query)
    .then( (appointments)=>{
        res.send(appointments)
    } )
    .catch( e=>{
        console.error(e)
    })
})
router.post('/',(req,res)=>{
    const {patient,date,schedule,specialty,doctor} = req.body
    controller.addAppointment(patient,date,schedule,specialty,doctor)
     .then((appointment)=>{
         res.send(appointment)
     })
     .catch( e=>{
         console.error(e);
     })
})
router.put('/:id',(req,res)=>{
    controller.updateAppointment(req.params.id,req.body)
        .then( (updatedAppointment)=>{
            res.send(updatedAppointment)
        } )
        .catch(e=>{
            console.error(e)
        })
})
router.delete('/',(req,res)=>{
    res.send('petición delete a cita médica')
})

module.exports = router;