const express = require('express');
const engine = require('ejs-mate');
const path = require('path');


//Initializations
const app = express();
console.log("Iniciacion de")

//settings

app.set('views', path.join(__dirname,'views'));
app.engine('ejs',engine);
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);


//Routes
app.use(express.static(__dirname + '/public'));
app.use('/',require('./routes/index'));
require('./routes/index');


// starting the server
app.listen(app.get('port'),() =>{
    console.log('Server on port', app.get('port'));
});