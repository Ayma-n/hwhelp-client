import React from "react";
import { sendMsg } from "./logic/sockets";

export function showChatMessage(message: string) {
  const newDiv = document.createElement("div");
  newDiv.innerText = message;
  document.querySelector("#message-container")?.appendChild(newDiv);
}
export default function Chat() {

  function handleFormSubmit(e: any) {
    e.preventDefault();
    const input: HTMLInputElement = document.querySelector("#message-input") as HTMLInputElement;
    sendMsg(input.value);
    input.value = "";
  }
  return (
    <div id="Chat">
      <div id="message-container"></div>
      <form id="send-container" onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="message-input"
          className="border-solid border-4 hover:outline-none rounded-lg "
        />
        <button
          type="submit"
          id="send-button"
          className="rounded-md bg-blue-100 ml-2 w-16 h-10 hover:bg-blue-300 delay-75 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
