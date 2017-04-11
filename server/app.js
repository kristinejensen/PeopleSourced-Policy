var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var login = require('./routes/login');
var data = require('./routes/data');
var list_data = require('./routes/list_data');
// var search = require('./routes/search');
var portDecision = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/login', login);
/* Whatever you do below this is protected by your authentication. */
// app.use(decoder.token);

// app.get('/login', login);


app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});
