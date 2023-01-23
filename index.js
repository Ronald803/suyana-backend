const express = require('express');
const app = express();
const config = require('./config')
const router = require('./network/routes')

router(app);
app.listen(config.port, ()=>{
    console.log(`Puerto ${config.port} escuchando, servidor backend suyaña`)
})