const express = require("express");
const startWork = require("./main");
const app = express();
const http = require("http").createServer(app);
const subscribe = require("./subscribe");
const puppeteer = require("puppeteer");
const activetalker = require("./Models/AllKnife");
var cors = require("cors");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const controller = require("./mycontroller");
const bodyParser = require("body-parser");
const {
  lastAccauntController,
} = require("./controllers/lastAccauntsController");
let chronium;
app.use(cors());
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.get("/page", function (request, response) {
  startWork.startWork(io).then(response.send("ok"));
});
app.get("/getTalkers", function (request, response) {
  puppeteer.launch({ headless: false }).then((browser) => {
    chronium = browser;
    startWork.pickCommentators(io, request.query.target_accaunt, browser);
    response.send("ok");
  });
});
app.get("/stopgetTalkers", function (req, res) {
  chronium
    .close()
    .then((r) => console.log("closed"))
    .catch((e) => console.log(e));
});
app.post("/sendReport", function (request, response) {
  // io.sockets.emit("hello",request.body.firstName)
  subscribe
    .getTalkers(io)
    .then((result) => response.send(JSON.stringify(result)));
});
app.post("/sendlastacc", function (request, response) {
  lastAccauntController.create(request.body.name, request.body.date);
  response.send("ok");
  io.sockets.emit(
    "lastaccaunt",
    JSON.stringify({ name: request.body.name, date: request.body.date })
  );
});
app.get("/getlastacc", function (request, response) {
  // io.sockets.emit("hello",request.body.firstName)
  lastAccauntController.get().then((r) => response.send(r));
});
app.get("/subscribe", function (request, response) {
  puppeteer.launch({ headless: false }).then((browser) => {
    chronium = browser;
    subscribe.startSubscribe(io, browser);
  });
});
app.delete("/lastacc/delete/:name", function (request, response) {
  let name = request.param("name");
  lastAccauntController.del(name).then((r) => response.send("deleted"));
});
app.get("/alltalkers", function (request, response) {
  activetalker.activetalker.findAll().then(result=>{
    response.send(JSON.stringify(result))
  })
});
app.delete("/alltalkers/delete/", function (request, response) {
   activetalker.activetalker.destroy({ truncate : true, cascade: false }).then(response.send("deleted"))
});
io.on("connection", (socket) => {
  console.log("connected");
});
http.listen(4000);
