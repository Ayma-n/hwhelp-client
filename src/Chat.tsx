import React from "react";
import { sendMsg } from "./logic/sockets";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function showChatMessage(message: string, sender: string) {
  const newDiv = document.createElement("div");
  newDiv.innerText = sender + ": " + message;
  document.querySelector("#message-container")?.appendChild(newDiv);
}
export default function Chat() {
  function handleFormSubmit(e: any) {
    e.preventDefault();
    const input: HTMLInputElement = document.querySelector(
      "#message-input"
    ) as HTMLInputElement;
    console.log(input.value);
    sendMsg(input.value);
    showChatMessage(input.value, "Me");
    input.value = "";
  }
  return (
    <div id="Chat">
      <div
        id="message-container"
        className="h-90 overflow-scroll absolute b-1 text-center w-32 mx-auto container"
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
        <Button id="send-button" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
}
