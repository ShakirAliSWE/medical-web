require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/config/db");
const http = require("http");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

// CORS middleware for Express
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDatabase();

// Routes
app.use(require("./src/routes/index.route"));

// Socket.IO connection handling with CORS setup
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("doctor", (data) => {
    io.emit("doctor", data);
  });

  socket.on("patient", (data) => {
    io.emit("patient", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Handle process exit
process.on("exit", () => {
  mongoose.connection.close();
  console.log("Mongoose connection closed");
});
