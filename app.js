
FROM quay.io/soketi/soketi:0.17-16-alpine

ARG DEFAULT_APP_ID
ENV DEFAULT_APP_ID=$DEFAULT_APP_ID

ARG DEFAULT_APP_KEY
ENV DEFAULT_APP_KEY=$DEFAULT_APP_KEY

ARG DEFAULT_APP_SECRET
ENV DEFAULT_APP_SECRET=$DEFAULT_APP_SECRET

var express = require('express');
var cors = require('cors')
var app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;


app.get("/",(req,res)=>{
  return res.send("welcome to chess game")
})


// app.use("/chess",express.static('public'));

// app.get('/chess', function (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });


var io = require('socket.io')(http);

const { socketserver } = require("./serverscript/socketserver");

socketserver(io);









http.listen(port, function () {
  console.log('listening u on port: ' + port);
});

// io.on('connection', function (socket) {
//   console.log('new connection');

//   // Called when the client calls socket.emit('move')
//   socket.on('move', function (msg) {
//     socket.broadcast.emit('move', msg);
//   });
// });

