import { Class } from "./class";

export enum ClassGroup {
  Priest = "Priest",
  Rogue = "Rogue",
  Warrior = "Warrior",
  Wizard = "Wizard",
}

export const ClassGroupMap: Record<string, ClassGroup> = {
  [Class.Bard]: ClassGroup.Rogue,
  [Class.Cleric]: ClassGroup.Priest,
  [Class.Druid]: ClassGroup.Priest,
  [Class.Fighter]: ClassGroup.Warrior,
  [Class.Illusionist]: ClassGroup.Wizard,
  [Class.Mage]: ClassGroup.Wizard,
  [Class.Paladin]: ClassGroup.Warrior,
  [Class.Ranger]: ClassGroup.Warrior,
  [Class.Thief]: ClassGroup.Rogue,
};
