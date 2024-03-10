const { Server } = require("socket.io");
const http = require("http");
const {app} = require("./api-server");
const { setupWorker } = require("@socket.io/sticky");

const server = http.createServer(app);

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

export function sendMessageToSocket(message) {
  if (io) {
    io.to(`room-${message.channelId}`).emit("msg_rcvd", message);
  } else {
    console.error("Socket.IO server is not initialized");
  }
}

setupWorker(io);
