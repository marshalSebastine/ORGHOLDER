const dotenv = require('dotenv').config();
const app = require('./app');
const config = require('../config/appconfig');


app.listen(config.port,() => {
    console.log('server listening on port', config.port)
})