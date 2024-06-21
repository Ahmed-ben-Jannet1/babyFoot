import ws from "./websocket.js";

export const loadGames = async () => {
  console.log("Loading games...");
  const response = await fetch("/api");
  const games = await response.json();
  console.log("Loaded games:", games);
  games.forEach(updateGame);
  updateCounter();
};

export const updateGame = (game) => {
  console.log("Updating game:", game);
  const gamesDiv = document.getElementById("games");
  let gameDiv = document.getElementById(`game-${game.id}`);

  if (!gameDiv) {
    gameDiv = document.createElement("div");
    gameDiv.id = `game-${game.id}`;
    gameDiv.classList.add("game");
    gamesDiv.appendChild(gameDiv);
  }

  gameDiv.innerHTML = `
        <span>${game.name_prem} vs ${game.name_sec} - ${
    game.status ? "Finished" : "Ongoing"
  }</span>
        <button onclick="toggleStatus(${game.id})">${
    game.status ? "Restart" : "Finish"
  }</button>
        <img src="delete-icon.svg" class="delete-icon" onclick="deleteGame(${
          game.id
        })" />
    `;
};

export const createGame = async () => {
  console.log("Creating new game...");
  const namePrem = document.getElementById("namePrem").value;
  const nameSec = document.getElementById("nameSec").value;
  const errorDiv = document.getElementById("error");

  // Validation
  const namePattern = /^[a-zA-Z0-9]{3,20}$/;
  if (!namePattern.test(namePrem) || !namePattern.test(nameSec)) {
    errorDiv.innerText =
      "Player names must be 3-20 characters long and contain no special characters.";
    return;
  } else {
    errorDiv.innerText = "";
  }

  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name_prem: namePrem, name_sec: nameSec }),
  });

  const game = await response.json();
  console.log("Created game:", game);
  updateGame(game);
  updateCounter();
};

export const toggleStatus = async (id) => {
  console.log("Toggling status for game ID:", id);
  const response = await fetch(`/api/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const game = await response.json();
  console.log("Updated game:", game);
  updateGame(game);
  updateCounter();
};

export const deleteGame = async (id) => {
  console.log("Deleting game ID:", id);
  await fetch(`/api/${id}`, {
    method: "DELETE",
  });
  updateCounter();
};

export const updateCounter = () => {
  const gamesDiv = document.getElementById("games");
  const games = gamesDiv.children;
  let unfinishedCount = 0;

  Array.from(games).forEach((gameDiv) => {
    if (gameDiv.querySelector("span").innerText.includes("Ongoing")) {
      unfinishedCount++;
    }
  });

  document.getElementById("unfinishedCounter").innerText = unfinishedCount;
};
