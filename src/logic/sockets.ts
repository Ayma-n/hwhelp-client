import { io, Socket } from "socket.io-client";
import { PersonQueue } from "../types/QueueTypes";

// TODO: call this function
export function connectToServerAndEnterQueue(personObj: PersonQueue) {

  const SERVER_URL = process.env.SERVER_URL || "http://localhost:8000";

  const socket = io(SERVER_URL, { autoConnect: false });

  socket.on("connection", () => {
    console.log(
      `you connected to the server at ${SERVER_URL} with id ${socket.id}`
    );
  });

  var connectedUserId: string | null = null;
  socket.connect();
  // TODO: combine to same channel
  console.log("personObj: ", personObj);
  socket.emit("setup info for queue", personObj);
  //catch all listener for debugging
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on("test", (req, res) => {
      console.log("received req", req);
  })

  const matchedPerson = new Promise<any>((resolve, reject) => {
    console.log("promise initiated");
    socket.on("waiting for queue", (req, res) => {
      console.log("response from match: ", req);
        console.log("you have connected with: ", req.displayName);
        connectedUserId = req.socketId;
        resolve(req)
    });
  })

  return matchedPerson

}

export function sendMsg(msg: string, socket: Socket) {
//   socket.emit("private message", {
//     content: msg,
//     to: connectedUserId,
//   });
}
