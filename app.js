//initial requirements
const express = require('express');
const app     = express();
const routes  = require('./routes/routes.js');
const port    = parseInt(process.argv[2]);
//express set up
app.set('view engine', 'pug');
app.use(express.static('public'));
//app routes
app.use(routes);
//server starter
app.listen(port, () => console.log('server started at port: ' + port));