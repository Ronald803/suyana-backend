const express = require('express');

const router = express.Router();

router.get('/:specialtyId/date/:dateId',(req,res)=>{
    const { specialtyId, dateId } = req.params;
    res.json({
        specialtyId,
        dateId,
    })
})

module.exports = router;