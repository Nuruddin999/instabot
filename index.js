const express = require("express");
const startWork=require("./main") 
const subscribe=require("./subscribe")
const activetalker=require("./Models/AllKnife")
var io = require('socket.io')(http);
const app = express();
 
app.use(express.static(__dirname + "/public"));
 

app.get("/subscribe", function(request, response){
     startWork.startWork()
  response.send("началось");
});
app.get("/getTalkers", function(request, response){
  subscribe.getTalkers().then(result=>response.send(JSON.stringify(result)))

});
io.on('connection', (socket) => {
  console.log('a user connected');
});
app.listen(3000);