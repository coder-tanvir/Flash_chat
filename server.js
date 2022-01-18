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

  //Single client that he is connecting
  socket.emit("message", "Welcome to Flash⚡Chat");

  //Broadcast to all except the one connecting
  socket.broadcast.emit("message", "A user has joined the chat");

  //Client disconnects
  socket.on("disconnect", () => {
    //emits to everyone
    io.emit("message", "A user has left chat");
  });

  //Emit message to server

  socket.on("chatmessage", (text) => {
    io.emit("message", text);
    console.log(text);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
