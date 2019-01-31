var express = require('express');
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));

app.get('/', function(req, res) {
    console.log("This is get Method.");
    res.send("Working");
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/', function(req, res){
    res.send(req.body);
    
    var fs = require('fs');
    
    var writer = fs.createWriteStream('../img_data.json');
   
    writer.write(JSON.stringify(req.body));
});

var server = app.listen(3001, function(){
    console.log("Express server has started on port 3001")
});