import { Player } from "./player.interface";

let currentPlayer: Player = {
  name: "",
};

let nameInput: HTMLInputElement;

export function getPlayer(): Player {
  return currentPlayer;
}

export function registerPlayerDivListeners(playerDiv: HTMLDivElement) {
  // Name selection
  nameInput = playerDiv.querySelector("#player-name-input") as HTMLInputElement;

  nameInput.addEventListener("input", updatePlayerName);
}

// Name selection

function updatePlayerName(event: Event) {
  const target = event.target as HTMLSelectElement;
  currentPlayer.name = target.value;
}
