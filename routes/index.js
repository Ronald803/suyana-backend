const specialtyRouter = require('./specialty.router');
const userRouter = require('./user.router');
const searchRouter = require('./search.router');

function routerApi(app){
    app.use('/api/specialty',specialtyRouter);
    app.use('/api/user',userRouter);
    app.use('/api/search',searchRouter);
}

module.exports = routerApi;