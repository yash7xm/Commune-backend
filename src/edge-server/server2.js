const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { ServerConfig } = require("../config");

const { consumeMessages } = require("../kafka/consumer.js");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected on edge-server 2:", socket.id);

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

consumeMessages(io)
  .then(() => {
    console.log("Kafka consumer started successfully");
  })
  .catch((error) => {
    console.error("Error starting Kafka consumer:", error);
  });

server.listen(4001, () => {
  console.log(`Edge Server listening on port ${4001}`);
});
