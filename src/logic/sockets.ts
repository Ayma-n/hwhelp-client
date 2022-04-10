import { io } from "socket.io-client";
import { PersonQueue } from "../types/QueueTypes";
const SERVER_URL = "http://localhost:3000";
const socket = io(SERVER_URL, { autoConnect: false });

socket.on("connection", () => {
  console.log(
    `you connected to the server at ${SERVER_URL} with id ${socket.id}`
  );
});

var connectedUserId: string | null = null;
// TODO: call this function
export function connectToServerAndEnterQueue(personObj: PersonQueue) {
  socket.connect();
  // TODO: combine to same channel
  socket.emit("setup info for queue", personObj);
  socket.on("waiting for queue", (req, res) => {
    console.log(res);
    res.then((userObj: any) => {
      console.log("you have connected with: ", userObj.firstName);
      connectedUserId = userObj.socketId;
    });
  });
}

export function sendMsg(msg: string) {
  socket.emit("private message", {
    content: msg,
    to: connectedUserId,
  });
}
