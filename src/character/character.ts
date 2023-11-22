import { IsEnum, IsInt, IsString, Max, Min } from "class-validator";
import { Class } from "./class";
import { Level } from "./level";
import { Race } from "./race";

export class Character {
  @IsString()
  name: string;

  @IsEnum(Class)
  class: Class;

  @IsInt()
  @Max(20)
  @Min(1)
  level: number;

  @IsEnum(Race)
  race: Race;

  @IsString()
  placeOfOrigin: string;

  constructor(
    name: string,
    characterClass: Class,
    level: Level,
    race: Race,
    placeOfOrigin: string
  ) {
    this.name = name;
    this.class = characterClass;
    this.level = level;
    this.race = race;
    this.placeOfOrigin = placeOfOrigin;
  }
}
