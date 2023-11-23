import { Character } from "./character";

const BlankCharacterSheet = require("../../res/blank-character-sheet.pdf");
console.log(BlankCharacterSheet);

export function exportToPdf(character: Character) {
  const a = document.createElement("a");

  a.href = URL.createObjectURL(
    new Blob([BlankCharacterSheet], {
      type: "application/pdf",
    })
  );
  a.setAttribute("download", `${character.name || "character"}.pdf`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
