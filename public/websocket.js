import { loadGames } from "./babyManager.js";
import { updateCounter } from "./babyManager.js";
import { updateGame } from "./babyManager.js";
import { addChatMessage } from "./chatManager.js";

const ws = new WebSocket("ws://localhost:3005");

ws.onopen = () => {
  console.log("Connected to the server");
  loadGames();
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log("Received message:", message);

  if (message.type === "chatMessage") {
    addChatMessage(message);
  } else {
    if (message.deleted) {
      document.getElementById(`game-${message.id}`).remove();
    } else {
      updateGame(message);
    }
    updateCounter();
  }
};

ws.onclose = () => {
  console.log("Disconnected from the server");
};

export default ws;
