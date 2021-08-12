require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
const bcrypt = require("bcryptjs");

// import socket.io & cors security for chat
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.PORT || process.env.FRONTEND_URL,
  },
});

// static user details
const userData = {
  userId: "789789",
  password: "p@ssword",
  name: "Admin",
  username: "admin",
  isAdmin: true,
};
//  Hashed password from userData Object
const hashedPassword = bcrypt.hashSync(userData.password, bcrypt.genSaltSync());

// SOCKET.IO SECTION
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";
// port for socket.io messages
const PORT = process.env.SOCKET_MESSAGES_UPLOAD_PORT;
// init socket connection
io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Listen start typing events
  socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
    console.log("Received true on server :", data);
    io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
  });
  // Listen stop typing events
  socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
    console.log("Received false on server :", data);
    io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

// UPLOAD PICTURES SECTION
global.__basedir = __dirname;
// cors option for upload server
var corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(corsOptions));
// app.use(cors());
// routes for upload picture server
const initRoutes = require("./src/routes");
// middleware fro upload picture
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// Admin Login Section
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

// request handlers
app.get("/", (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid user to access it." });
  res.send("Welcome ! - " + req.user.name);
});
// validate the user credentials
app.post("/users/signin", function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
  // Compare & verify hashed password with req. body assword
  const hashedPassCompare = bcrypt.compareSync(
    req.body.password,
    hashedPassword
  );
  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required.",
    });
  }

  // return 401 status if the credential is not match.
  if (user !== userData.username || !hashedPassCompare) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong.",
    });
  }

  console.log("Username :", req.body.username);
  console.log("Password :", hashedPassword);
  console.log("compar Password <-> hashed Password :", hashedPassCompare);

  // generate token
  const token = utils.generateToken(userData);
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  // return the token along with user details
  if (hashedPassCompare) {
    return res.json({ user: userObj, token });
  } else {
    return;
  }
});

// verify the token and return it if it's valid
app.get("/verifyToken", function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    // return 401 status if the userId does not match.
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

// listener for user login, upload pictures and messages transfert
server.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
