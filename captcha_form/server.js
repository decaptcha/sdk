var express = require('express');
var app = express()
  , server = require('http').createServer(app)

app.get('/', function(req, res) {
  console.log(`roshan1: bhai call aagyi h`);
  res.sendFile(__dirname + "/index.html")
});

server.listen(8083);
