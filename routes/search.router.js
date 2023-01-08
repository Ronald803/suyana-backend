const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    const {pacient, doctor} = req.query;
    if(pacient||doctor){
        res.json({pacient,doctor});
    } else {
        res.send("No hay parametros de busca")
    }
})

module.exports = router;