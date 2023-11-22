import { Class } from "./class";
import { Race } from "./race";

export interface Character {
  name: string;
  class: Class;
  level: number;
  race: Race;
  placeOfOrigin: string;
}
