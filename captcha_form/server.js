var express = require('express');
var app = express()
  , server = require('http').createServer(app)

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

server.listen(8083);
