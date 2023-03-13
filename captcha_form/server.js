var express = require("express");
const path = require('path')
var app = express(),
  server = require("http").createServer(app);


app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.sendFile("index.html");
});

server.listen(8083);
