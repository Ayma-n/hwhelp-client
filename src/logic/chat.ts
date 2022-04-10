import { sendMsg } from "./sockets";

export function chatSendMsg() {
const messageForm: HTMLFormElement = document.querySelector("#message-form") as HTMLFormElement;
const messageInput: HTMLInputElement  = document.querySelector("#message-input") as HTMLInputElement;

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    sendMsg(message);
    messageInput.value = "";
  });
}