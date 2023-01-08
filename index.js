const express = require('express');
const routerApi = require('./routes') //no es necesario especificar el archivo porque por defecto busca el archivo index

const app = express();
const port = 4000;

// app.get('/',(req,res)=>{
//     res.send("This is the main route");
// });

routerApi(app);
app.listen(port, ()=>{
    console.log(`Puerto ${port} escuchando, servidor backend suyaña`)
})