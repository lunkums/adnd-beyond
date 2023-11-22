import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { getCharacter } from "../character/character-div";
import { getPlayer } from "../player/player-div";
import { ImportEvent } from "./import-event";
import { Profile } from "./profile";

let profileDiv: HTMLDivElement;

export function registerProfileDivListeners(profileDivElement: HTMLDivElement) {
  profileDiv = profileDivElement;

  // Import
  const importInput = profileDiv.querySelector(
    "#profile-import-input"
  ) as HTMLInputElement;

  importInput.addEventListener("change", importFile);

  // Export
  const exportJsonButton = profileDiv.querySelector(
    "#profile-export-json-button"
  ) as HTMLButtonElement;
  const exportPdfButton = profileDiv.querySelector(
    "#profile-export-pdf-button"
  ) as HTMLButtonElement;

  exportPdfButton.addEventListener("click", exportPdfFile);
  exportJsonButton.addEventListener("click", exportJsonFile);
}

function importFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files[0];

  if (file) {
    file.text().then((fileContents) => {
      const importedObject = JSON.parse(fileContents);

      if (typeof importedObject !== "object") {
        alert(`Selected an invalid profile!`);
        return;
      }

      const profile = plainToInstance(Profile, importedObject, {
        enableImplicitConversion: true,
      });
      const validationErrors = validateSync(profile, {
        skipMissingProperties: false,
      });

      if (validationErrors.length !== 0) {
        alert(`Selected an invalid profile:\n\n${validationErrors.join("\n")}`);
      } else {
        const importEvent: ImportEvent = new CustomEvent("import", {
          detail: { profile },
        });

        profileDiv.dispatchEvent(importEvent);
      }
    });
  }
}

function getProfile(): Profile {
  return {
    character: getCharacter(),
    player: getPlayer(),
  };
}

function exportPdfFile(event: Event) {
  // TODO: Export the profile to a form-fillable PDF.

  // Prevent from submitting form
  event.preventDefault();
}

function exportJsonFile(event: Event) {
  const profile = getProfile();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(profile, null, 2)], {
      type: "application/JSON",
    })
  );
  a.setAttribute("download", `${profile.character.name || "character"}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Prevent from submitting form
  event.preventDefault();
}
