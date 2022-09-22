//load modules
var express = require("express");
var app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var bodyParser = require("body-parser");
const port = process.env.PORT || 3002;

//set view engine to ejs
app.set("view engine", "ejs");

//set upp public directory to serve static files
app.use(express.static("public"));

//Initiate bodyParser to parse request body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//Routes

app.get("/", (req, res) => {
  res.render("index");
});

// Socket.io
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Run server
server.listen(port, () => {
  console.log("listening on *:" + port);
  console.log("http://localhost:" + port);
});
