import { Profile } from "../profile/profile";
import { Character } from "./character.interface";
import { Class } from "./class";
import { ClassGroupMap } from "./class-group";
import { enumFromStringValue } from "./enum-utils";
import { MaxLevel, MinLevel } from "./level";
import { Race } from "./race";

const Character: Character = {
  name: "",
  class: Class.Bard,
  level: 1,
  race: Race.Dwarf,
  placeOfOrigin: "",
};

let classGroupLabel: HTMLLabelElement;

export function getCharacter(): Character {
  return Character;
}

export function setCharacter(character: Character) {
  alert(character);
}

export function registerCharacterDivListeners(
  characterDiv: HTMLDivElement,
  profileDiv: HTMLDivElement
) {
  // Profile events
  profileDiv.addEventListener("import", importCharacter);

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
}

// Character import

function importCharacter(event: CustomEvent) {
  try {
    const profile = JSON.parse(event.detail.fileContents) as Profile;
    setCharacter(profile.character);
  } catch (error) {
    alert("Selected an invalid profile!");
  }
}

// Class selection

function addClassSelectOptions(classSelect: HTMLSelectElement) {
  Object.values(Class).forEach((characterClass) => {
    const option = document.createElement("option");
    option.value = characterClass;
    option.innerHTML = characterClass;
    classSelect.appendChild(option);
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
  Character.class = characterClass;
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
  Character.level = Number(target.value);
}

// Race selection

function addRaceSelectionOptions(raceSelect: HTMLSelectElement) {
  Object.values(Race).forEach((race) => {
    const option = document.createElement("option");
    option.value = race;
    option.innerHTML = race;
    raceSelect.appendChild(option);
  });
}

function updateCharacterRace(event: Event) {
  const target = event.target as HTMLSelectElement;
  const race = enumFromStringValue(Race, target.value);
  Character.race = race;
}
