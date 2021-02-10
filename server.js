const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const http = require("http");
const WebSocket = require("ws");

const server = http.createServer(express);
const wss = new WebSocket.Server({server});
const port = 8080;
wss.on("connection", function connection(ws){
  ws.on("message", function incoming(data){
    wss.clients.forEach(function each(client){
      if(client !== ws && client.readyState === WebSocket.OPEN){
        client.send(data);
      }
    });
  });
});


server.listen(port, function(){
  console.log("Server is listening on port 8080");
});
