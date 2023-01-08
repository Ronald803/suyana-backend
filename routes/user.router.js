const express = require('express');

const router = express.Router();

router.get('/', (req,res)=>{
    const {user_id} = req.query;
    res.json({
        user_id
    })

})

module.exports = router;
