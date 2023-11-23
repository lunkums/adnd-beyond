import { ImportEvent } from "../profile/import-event";
import { Character } from "./character";
import { Class } from "./class";
import { ClassGroupMap } from "./class-group";
import { enumFromStringValue } from "./enum-utils";
import { exportToPdf } from "./exporter";
import { MaxLevel, MinLevel } from "./level";
import { Race } from "./race";

let currentCharacter: Character = {
  name: "",
  class: Class.Fighter,
  level: 1,
  race: Race.Human,
  placeOfOrigin: "",
};

let classGroupLabel: HTMLLabelElement;

export function getCharacter(): Character {
  return currentCharacter;
}

export function setCharacter(character: Character) {
  currentCharacter = character;
}

export function registerCharacterDivListeners(
  characterDiv: HTMLDivElement,
  profileDiv: HTMLDivElement
) {
  // Profile events
  profileDiv.addEventListener("import", importCharacter);

  const exportButton = characterDiv.querySelector(
    "#character-export-pdf-button"
  ) as HTMLButtonElement;

  exportButton.addEventListener("click", exportCharacter);

  // Name input
  const nameInput = characterDiv.querySelector(
    "#character-name-input"
  ) as HTMLInputElement;

  nameInput.addEventListener("input", updateCharacterName);

  // Class selection
  const classSelect = characterDiv.querySelector(
    "#character-class-select"
  ) as HTMLSelectElement;
  classGroupLabel = characterDiv.querySelector(
    "#character-class-group-label"
  ) as HTMLLabelElement;

  addClassSelectOptions(classSelect);
  classSelect.addEventListener("change", updateClassGroupLabel);
  classSelect.addEventListener("change", updateCharacterClass);

  // Level selection
  const levelSelect = document.getElementById(
    "character-level-select"
  ) as HTMLSelectElement;

  addLevelSelectOptions(levelSelect);
  levelSelect.addEventListener("change", updateCharacterLevel);

  // Race selection
  const raceSelect = document.getElementById(
    "character-race-select"
  ) as HTMLSelectElement;

  addRaceSelectionOptions(raceSelect);
  raceSelect.addEventListener("change", updateCharacterRace);

  // Place of origin input
  const pooInput = characterDiv.querySelector(
    "#character-placeOfOrigin-input"
  ) as HTMLInputElement;

  pooInput.addEventListener("input", updateCharacterPoo);
}

// Character import

function importCharacter(event: ImportEvent) {
  setCharacter(event.detail.profile.character);
}

// Character export

function exportCharacter(event: Event) {
  exportToPdf(currentCharacter);

  // Prevent from submitting form
  event.preventDefault();
}

// Name input

function updateCharacterName(event: Event) {
  const target = event.target as HTMLSelectElement;
  currentCharacter.name = target.value;
}

// Class selection

function addClassSelectOptions(classSelect: HTMLSelectElement) {
  Object.values(Class).forEach((characterClass) => {
    const option = document.createElement("option");
    option.value = characterClass;
    option.innerHTML = characterClass;
    classSelect.appendChild(option);

    if (characterClass === Class.Fighter) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });
}

function updateClassGroupLabel(event: Event) {
  const target = event.target as HTMLSelectElement;
  const group: string = ClassGroupMap[target.value] || "Unknown";
  classGroupLabel.innerHTML = `<em>(${group})</em>`;
}

function updateCharacterClass(event: Event) {
  const target = event.target as HTMLSelectElement;
  const characterClass = enumFromStringValue(Class, target.value);
  currentCharacter.class = characterClass;
}

// Level selection

function addLevelSelectOptions(levelSelectElement: HTMLSelectElement) {
  for (let i = MinLevel; i <= MaxLevel; i++) {
    const level = String(i);
    const option = document.createElement("option");
    option.value = level;
    option.innerHTML = level;
    levelSelectElement.appendChild(option);
  }
}

function updateCharacterLevel(event: Event) {
  const target = event.target as HTMLSelectElement;
  currentCharacter.level = Number(target.value);
}

// Race selection

function addRaceSelectionOptions(raceSelect: HTMLSelectElement) {
  Object.values(Race).forEach((race) => {
    const option = document.createElement("option");
    option.value = race;
    option.innerHTML = race;
    raceSelect.appendChild(option);

    if (race === Race.Human) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });
}

function updateCharacterRace(event: Event) {
  const target = event.target as HTMLSelectElement;
  const race = enumFromStringValue(Race, target.value);
  currentCharacter.race = race;
}

// Place of origin input
function updateCharacterPoo(event: Event) {
  const target = event.target as HTMLSelectElement;
  currentCharacter.placeOfOrigin = target.value;
}
