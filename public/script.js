import {
  loadGames,
  createGame,
  toggleStatus,
  deleteGame,
} from "./babyManager.js";
import { sendMessage } from "./chatManager.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("createGame").addEventListener("click", createGame);
  document.getElementById("sendMessage").addEventListener("click", sendMessage);
});

window.toggleStatus = toggleStatus;
window.deleteGame = deleteGame;
