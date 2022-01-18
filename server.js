const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Setting static folder
app.use(express.static(path.join(__dirname, "public")));

//When Client connects
io.on("connection", (socket) => {
  console.log("New ws Connection......");
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
