let profileDiv: HTMLDivElement;

export function registerProfileDivListeners(profileDivElement: HTMLDivElement) {
  profileDiv = profileDivElement;

  const importInput = profileDiv.querySelector(
    "#profile-import-input"
  ) as HTMLInputElement;
  importInput.addEventListener("change", importFile);
}

function importFile(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files[0];

  if (file) {
    file.text().then((fileContents) => {
      const importEvent = new CustomEvent("import", {
        detail: { fileContents },
      });

      profileDiv.dispatchEvent(importEvent);
    });
  }
}
