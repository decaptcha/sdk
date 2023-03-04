var express = require('express');
const { fstat } = require('fs');
const { inspect } = require('util');
var app = express()
  , server = require('http').createServer(app)

app.get('/', function(req, res) {
  console.log(`roshan1: bhai call aagyi h`);
  res.sendFile("/Users/roshan/Documents/bstack_repos/sdk/captcha_form/index.html")
});

app.post('/data', function(req, res) {
  console.log(`roshan1: bhai call aagyi h ${inspect(req.data)}`);
  res.sendFile("/Users/roshan/Downloads/myserver/index.html")
});
server.listen(8083);
