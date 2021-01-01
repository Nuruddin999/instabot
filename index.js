const express = require("express");
const startWork=require("./main") 
const app = express();
const http = require("http").createServer(app)
const subscribe=require("./subscribe")
const activetalker=require("./Models/AllKnife")
const  io = require('socket.io')(http);
const controller = require('./mycontroller');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


app.use(express.static(__dirname + "/public"));
 

app.get("/page", function(request, response){
     startWork.startWork(io).then(response.send("ok"))
});
app.get("/getTalkers", function(request, response){
  subscribe.getTalkers().then(result=>response.send(JSON.stringify(result)))

});
app.post("/sendReport", function(request, response){
 // io.sockets.emit("hello",request.body.firstName)
  subscribe.getTalkers(io).then(result=>response.send(JSON.stringify(result)))

});
io.on("connection", (socket) => {
  console.log("connected")
});
http.listen(3000);