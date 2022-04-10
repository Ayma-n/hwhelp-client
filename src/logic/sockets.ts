import { io, Socket } from "socket.io-client";
import { PersonQueue } from "../types/QueueTypes";
import { showChatMessage } from "../Chat";

var socket: Socket;
var connectedUserId: string;
export function connectToServerAndEnterQueue(personObj: PersonQueue) {

  const SERVER_URL = process.env.SERVER_URL || "http://localhost:8000";

  socket = io(SERVER_URL, { autoConnect: false });

  socket.on("connection", () => {
    console.log(
      `you connected to the server at ${SERVER_URL} with id ${socket.id}`
    );
  });

  socket.connect();
  socket.emit("setup info for queue", personObj);
  //catch all listener for debugging


  const matchedPerson = new Promise<any>((resolve, reject) => {
    socket.on("waiting for queue", (req, res) => {
        connectedUserId = req.socketId;
        listenForMessages(req.displayName);
        addVideoEventListener();
        resolve(req)
    });
  })

  return matchedPerson

}

function listenForMessages(name: string) {
  socket.on("private message", (req, res) => {
    showChatMessage(req.content, name);
  });
}

export function sendMsg(msg: string) {
  socket.emit("private message", {
    content: msg,
    to: connectedUserId,
  });
}
var peerIdObj: any;

export function sendVideoRequest() {
  socket.emit("caller setup", connectedUserId);
  socket.on("caller response", (req, res) => {
    peerIdObj = req;
  });
}
var peerId: string;
export function addVideoEventListener() {
  socket.on("receive response", (req, res) => {
    peerId = req;

  })
}

export function getPeerId() {
  return peerId;
}
export function getPeerIdObj() {
  return peerIdObj;
}

export function getCurrentUserId() {
  return socket.id;
}
