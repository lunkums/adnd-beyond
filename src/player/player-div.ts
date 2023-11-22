import { Player } from "./player.interface";

let currentPlayer: Player = {
  name: "",
};

export function getPlayer(): Player {
  return currentPlayer;
}

export function registerPlayerDivListeners(playerDiv: HTMLDivElement) {
  // Name selection
  const nameInput = playerDiv.querySelector(
    "#player-name-input"
  ) as HTMLInputElement;

  nameInput.addEventListener("input", updatePlayerName);
}

// Name selection

function updatePlayerName(event: Event) {
  const target = event.target as HTMLInputElement;
  currentPlayer.name = target.value;
}
