import { registerCharacterDivListeners } from "./character/character-div";
import { registerProfileDivListeners } from "./profile/profile-div";

function main() {
  const profileDiv = document.getElementById("profile-div") as HTMLDivElement;

  registerProfileDivListeners(profileDiv);

  const characterDiv = document.getElementById(
    "character-div"
  ) as HTMLDivElement;

  registerCharacterDivListeners(characterDiv, profileDiv);
}

main();
