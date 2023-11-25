import { Character } from "./character";
import { ClassGroup, ClassGroupMap } from "./class-group";
import { Level } from "./level";

export class AdndCharacter extends Character {
  constructor(character: Character) {
    const {
      class: characterClass,
      level,
      name,
      placeOfOrigin,
      race,
    } = character;

    super(name, characterClass, level as Level, race, placeOfOrigin);
  }

  get classGroup(): ClassGroup {
    return ClassGroupMap[this.class];
  }
}
