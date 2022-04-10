import React from "react";

export default function Chat() {
    const messageForm: HTMLFormElement = document.querySelector("#message-form") as HTMLFormElement;
    const messageInput: HTMLInputElement  = document.querySelector("#message-input") as HTMLInputElement;

    messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    // sendMsg(message);
    messageInput.value = "";
  });

  return (
    <div id="Chat">
      <div id="message-container"></div>
      <form id="send-container">
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
