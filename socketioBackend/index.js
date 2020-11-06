const io = require('socket.io')(3005);
var numPeople = 0
var peopleList = []
var connectionMap = {};//sockid:userName

setInterval(function () {
  console.log("timer 10s")
  sidObject = io.sockets.adapter.sids
  console.log("length of sID's", getObjectLength(sidObject))
  console.log("length of connectionMap", getObjectLength(connectionMap))
  // if (getObjectLength(sidObject) !== getObjectLength(connectionMap)){
  //   removeConnections()
  // }
  console.log("current people in chatroom", connectionMap)
}, 10000);

io.on('connect', socket => {

  console.log("someone connected", socket.id)
  connectionMap[socket.id] = ""
  numPeople = numPeople + 1


  // or with emit() and custom event names
  socket.emit('greetings', 'Hey!', { 'ms': 'jane' }, Buffer.from([4, 3, 3, 1]));

  // handle the event sent with socket.send()
  socket.on('message', (data) => {
    console.log("this is the message payload:", data);
    // io.emit(data)
    io.send(data)

  });
  socket.on("disconnect", () => {
    console.log("someone left")
    numPeople = numPeople - 1
    removeConnections()

    //removeConnections()
  });

  // handle the event sent with socket.emit()
  socket.on('salutations', (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });

  socket.on("addUser", (data) => {
    console.log("add users:", data)
    peopleList.push(data)
    connectionMap[socket.id] = data
    console.log("connection map", connectionMap)
    socket.send("Hello, " + data + "!");
    //send a copy of values from connectionMap to client
    io.emit("users",Object.values(connectionMap))

  });

  socket.on("removeUser", (data) => {
    console.log("removeuser", data)
  })


});

function removeConnections() {
  //console.log("list of clients b4 removal", io.sockets.adapter.sids)
  sidObject = io.sockets.adapter.sids
  var entries = Object.keys(sidObject)//entires -> key,val pair
  //dont we want to check to see if the connectionMap sockid are in entries, if not, remove sockid from connectionMap
  for (var key in connectionMap) {
    if (connectionMap.hasOwnProperty(key)) {

      if (entries.length > 0) {
        console.log(entries[0])
      }
      if (entries.includes(key)) {//key in entries
        console.log("")
      } else {
        console.log("sockid " + key + "-> " + connectionMap[key] + " is NOT active anymore", connectionMap[key])

        delete connectionMap[key]
      }
    }
  }
  console.log("list of clients after potential removal from my map", connectionMap)
  io.emit("users",Object.values(connectionMap))
  //console.log("sid", sidObject)

}

function getObjectLength(object) {
  var key, count = 0;

  // Check if every key has its own property
  for (key in object) {
    if (object.hasOwnProperty(key))

      // If the key is found, add it to the total length
      count++;
  }
  return count
}

