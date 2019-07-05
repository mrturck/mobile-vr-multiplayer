var express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const randomstring = require("randomstring");
const randomColor = require('randomcolor'); // import the script

app.use(express.static('public'))
app.get('/', function(req, res) {
   res.sendfile('index.html');
});
app.get('/portal', function(req, res) {
  res.sendfile('portal.html');
});
app.get('/helloworld', function(req, res) {
  res.sendfile('helloworld.html');
});
app.get('/list', function(req, res) {
  res.sendfile('list.html');
});

'use strict';

// const fs = require('fs');

// let rawdata = fs.readFileSync('data.json');  
// let views = JSON.parse(rawdata).views;  
// console.log(views); 
let views = 0 

data = {}



newClient = () => {
  n = new Object();
  let id = randomstring.generate()
  data[id.toString()] = new Object() 
  data[id]["attributes"] = new Object()
  // data[id]["attributes"]["color"] = randomColor().toString()
  return id
}

function update() {
  let obj = new Object()
  obj.views = views
  let update = JSON.stringify(obj);  
  fs.writeFileSync('data.json', update);  
}
// const myVar = setInterval(update, 30000);

let clients = Object.keys(data).length;

io.on('connection', function(socket) {
   views++
   let id = newClient()
   socket.emit('welcome',{ msg: id})
   clients++;

   io.sockets.emit('broadcast',{ msg: clients + ' clients connected!', views: views + ' lifetime sessions'});
   
   socket.on('update', function(d) {
     if (data[d.msg.id]) {
     data[d.msg.id.toString()]["attributes"] = d.msg.attributes
     io.sockets.emit('change',data)
     }
     })

     message = () => {
      msg = randomstring.generate()
      io.sockets.emit('message',{msg: msg})
      console.log(msg)
    }
    // const testChat = setInterval(message, 3000)

    socket.on('message', function(data) {
      socket.broadcast.emit('message',{msg: data.msg})

    })

   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('delete', {id: id})
      delete data[id]
      io.sockets.emit('broadcast',{ msg: clients + ' clients connected!'});
    });
});

http.listen(3000, function() {
   console.log('listening on *:3000');
});
