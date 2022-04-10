import React, {useState} from "react";
import { sendMsg, sendVideoRequest } from "./logic/sockets";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import { getPeerId, getPeerIdObj, getCurrentUserId } from './logic/sockets';
// import Receiver from "./Receiver";
// import Caller from "./Caller";

export function showChatMessage(message: string, sender: string) {
  const newDiv = document.createElement("div");
  newDiv.innerText = sender + ": " + message;
  document.querySelector("#message-container")?.appendChild(newDiv);
}
export default function Chat() {
  // const [peerIdObj, setPeerIdObj]: any = useState({});
  // const [callerPeerId, setCallerPeerId]: any = useState("");
  // const [currentUserId, setCurrentUserId]: any = useState("");

  function handleFormSubmit(e: any) {
    e.preventDefault();
    const input: HTMLInputElement = document.querySelector(
      "#message-input"
    ) as HTMLInputElement;
    sendMsg(input.value);
    showChatMessage(input.value, "Me");
    input.value = "";
  }

  // function handleVideo() {
  //   // generate peer id for video call
  //   // send peer id to server
  //   sendVideoRequest();
  //   setCallerPeerId(getPeerId());
  //   setPeerIdObj(getPeerIdObj());
  //   setCurrentUserId(getCurrentUserId());

  // }
  return (
    <div id="Chat">
      <div
        id="message-container"
        className="h-90 overflow-scroll absolute b-1 text-center mx-auto container flex-col-reverse justify-end"
      ></div>
      <form
        id="send-container"
        className="flex space-x-4"
        onSubmit={handleFormSubmit}
        style={{
          bottom: 10,
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, -50%)",
          marginRight: "-50%",
        }}
      >
        <input
          type="text"
          id="message-input"
          className="border-solid border-4 hover:outline-none rounded-lg"
          style={{ marginRight: 4 }}
          placeholder="hello!"
        />
        <Button id="send-button" onClick={handleFormSubmit} variant="contained">
          Send
        </Button>
      </form>
      {/* <Button id="start-video-button" variant="contained" onClick={handleVideo}>Start Video</Button>
      {peerIdObj && peerIdObj && currentUserId===callerPeerId ? <Caller callerPeerId={callerPeerId} receiverPeerId={peerIdObj.receiverPeerId}></Caller> : <Receiver receiverPeerId={peerIdObj.receiverPeerId}></Receiver>} */}
    </div>
  );
}
