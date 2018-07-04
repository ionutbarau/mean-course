//import http
const http = require('http');
//import debug
const debug = require('debug')('node-angular');
//import express app from app.js
const expressApp = require('./backend/app');


//some functions for calculation the port and error handling
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};


//normalize the port
const port = normalizePort(process.env.PORT || "3000");

//set the port for express app
expressApp.set('port',port);
//create the node server
const server = http.createServer(expressApp);
//set the handlers on the server
server.on("error", onError);
server.on("listening", onListening);
//start the server on the specified port
server.listen(port);



