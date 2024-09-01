const express = require('express');
const router = express.Router();
const controller = require('./controller')
const responseFunc = require('../../network/responseFunc')

router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    controller.login(email,password)
        .then((message)=>{
            responseFunc.success(req,res,"Sesión iniciada correctamente",message,201)
        })
        .catch( e=>{
            responseFunc.error(req,res,400,e)
        })
})

module.exports = router;
