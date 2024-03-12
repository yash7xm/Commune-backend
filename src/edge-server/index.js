const { Server } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { ServerConfig } = require("../config");

const { consumeMessages } = require("../kafka/consumer.js");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join room
  socket.on("joinRoom", (roomId) => {
    socket.join(`room-${roomId}`);
    console.log(`Joined room room-${roomId}`);
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

consumeMessages()
  .then((message) => {
    console.log(message);
    io.to(`room-${message.channelId}`).emit("msg_rcvd", message);
  })
  .catch((error) => {
    console.log(error);
  });

server.listen(ServerConfig.WS_SERVER_PORT, () => {
  console.log(`Edge Server listening on port ${ServerConfig.WS_SERVER_PORT}`);
});
