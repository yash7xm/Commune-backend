const http = require("http");
const {app} = require("./api-server");
const {socketServer} = require("./edge-server");

// Create HTTP server
const server = http.createServer(app);

// Initialize socket server
socketServer(server);

// Start server
server.listen(ServerConfig.PORT, () => {
  console.log(`Server listening on port ${ServerConfig.PORT}`);
});