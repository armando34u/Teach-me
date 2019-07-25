const express = require('express');

//Initializations
const app = express();

app.set('port', process.env.PORT || 3000);

// starting the server
app.listen(app.get('port'),() =>{
    console.log('Server on port', app.get('port'));
});