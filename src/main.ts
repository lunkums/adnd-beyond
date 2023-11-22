// For class-transformer
import "reflect-metadata";

import { registerCharacterDivListeners } from "./character/character-div";
import { registerPlayerDivListeners } from "./player/player-div";
import { ImportEvent } from "./profile/import-event";
import { Profile } from "./profile/profile";
import { registerProfileDivListeners } from "./profile/profile-div";

function onImport(event: ImportEvent) {
  const profile = event.detail.profile;
  const welcomeBannerSpan = document.getElementById("welcome-banner-span");
  const forms = document.forms;

  updateWelcomeBanner(profile, welcomeBannerSpan);
  updateForms(profile, forms);
}

function updateWelcomeBanner(profile: Profile, welcomeBannerSpan: HTMLElement) {
  welcomeBannerSpan.innerText = `- Welcome back, ${
    profile.player.name.split(" ")[0]
  }!`;
}

/**
 * Set all form field values to match the corresponding value in the
 * loaded profile. For example, the input field with ID
 * `#character-name-...` will be given the value corresponding to
 * profile.character.name.
 */
function updateForms(
  profile: Profile,
  forms: HTMLCollectionOf<HTMLFormElement>
) {
  for (let i = 0; i < forms.length; i++) {
    const form = forms[i];

    for (let j = 0; j < form.length; j++) {
      const field = form[j];
      const propertyNames = field.id.split("-");

      if (propertyNames.length < 2) {
        continue;
      }

      const property = (profile as any)[propertyNames[0]];

      if (!property) {
        continue;
      }

      // Access the new element value dynamically, using
      // the property names taken from the element ID.
      const newElementValue = property[propertyNames[1]];

      if (newElementValue) {
        const tagName = field.tagName.toLowerCase();

        if (tagName === "input" || tagName === "select") {
          type Element = HTMLInputElement & HTMLSelectElement;
          const element = field as Element;
          element.value = newElementValue;
          element.dispatchEvent(new Event("change"));
        }
      }
    }
  }
}

function main() {
  // Reset all forms
  for (let i = 0; i < document.forms.length; i++) {
    document.forms[i].reset();
  }

  // Register listeners for the various sections of the character builder

  const profileDiv = document.getElementById("profile-div") as HTMLDivElement;
  registerProfileDivListeners(profileDiv);

  const playerDiv = document.getElementById("player-div") as HTMLDivElement;
  registerPlayerDivListeners(playerDiv);

  const characterDiv = document.getElementById(
    "character-div"
  ) as HTMLDivElement;
  registerCharacterDivListeners(characterDiv, profileDiv);

  // Functionality to set all fields when a profile is imported
  profileDiv.addEventListener("import", onImport);
}

main();
