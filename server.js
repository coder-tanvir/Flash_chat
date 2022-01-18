const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userjoin, getcurrentuser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botname = "⚡ ";
//Setting static folder
app.use(express.static(path.join(__dirname, "public")));

//When Client connects
io.on("connection", (socket) => {
  console.log("New ws Connection......");

  socket.on("chatroom", ({ username, room }) => {
    const user = userjoin(socket.id, username, room);
    socket.join(user.room);

    //Single client that he is connecting
    socket.emit("message", formatMessage(botname, "Welcome to Flash⚡Chat"));

    //Broadcast to all except the one connecting
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botname, `${user.username} has joined ⚡Chat`)
      );
  });

  //Emit message to server
  socket.on("chatmessage", (text) => {
    const user = getcurrentuser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, text));
    console.log(text);
  });

  //Client disconnects
  socket.on("disconnect", () => {
    //emits to everyone
    io.emit(
      "message",
      formatMessage(botname, `${user.username} has left ⚡Chat`)
    );
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
