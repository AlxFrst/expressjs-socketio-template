//load modules
var express = require("express");
var app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var bodyParser = require("body-parser");
const port = process.env.PORT || 3002;
const clc = require("cli-color");
require("dotenv").config();

// Postgres connection
const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});

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
  var clientIp = socket.handshake.address.replace("::ffff:", "");
  console.log(clc.green("New connection from: " + clientIp));
  socket.on("disconnect", () => {
    console.log(clc.red(clientIp + " disconnected"));
  });
});

// Run server
server.listen(port, () => {
  console.log(clc.green(`Server listening on port ${port}`));
  console.log(clc.green(`http://localhost:${port}`));

  // Check connection
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client.query("SELECT NOW()", (err, result) => {
      release();
      if (err) {
        return console.error("Error executing query", err.stack);
      }
      console.log(clc.blueBright("Connected database " + process.env.DB_NAME));
    });
  });

  console.log("====================================");
  console.log("Press CTRL + C to stop the server");
  console.log("====================================");
});
