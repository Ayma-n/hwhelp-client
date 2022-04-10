import React from "react";

export default function Chat() {
  return (
    <div id="Chat">
      <div id="message-container"></div>
      <div id="name-div">
        <form id="name-form">
          <input
            id="name-input"
            className="border-2 border-blue border-solid rounded-md p-0.5 pr-0"
            placeholder="Enter Your Name"
            type="text"
          />
          <button id="name-submit" className="text-white">
            Submit
          </button>
        </form>
      </div>
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
