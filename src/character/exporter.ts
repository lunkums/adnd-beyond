import { PDFDocument } from "pdf-lib";
import { Player } from "../player/player.interface";
import { Character } from "./character";

export function exportToPdf(player: Player, character: Character) {
  fillForm(player, character).then((value) => {
    const a = document.createElement("a");

    a.href = URL.createObjectURL(
      new Blob([value], {
        type: "application/pdf",
      })
    );
    a.setAttribute("download", `${character.name || "character"}.pdf`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

async function fillForm(player: Player, character: Character) {
  const formUrl =
    "https://raw.githubusercontent.com/lunkums/adnd-2e-character-sheets/main/MI_AD&DCharForm46.pdf";
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();

  const playerNameField = form.getTextField("Player Name");
  const characterNameField = form.getTextField("Character");
  const classField = form.getTextField("Class");
  const levelField = form.getTextField("Level");
  const raceField = form.getTextField("Race");
  const placeOfOriginField = form.getTextField("Place of Origin");

  playerNameField.setText(player.name);
  characterNameField.setText(character.name);
  classField.setText(character.class);
  levelField.setText(String(character.level));
  raceField.setText(character.race);
  placeOfOriginField.setText(character.placeOfOrigin);

  return pdfDoc.save({ updateFieldAppearances: false });
}
