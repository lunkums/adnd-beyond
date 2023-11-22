import { Type } from "class-transformer";
import { IsNotEmptyObject, ValidateNested } from "class-validator";
import { Character } from "../character/character";
import { Player } from "../player/player.interface";

export class Profile {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Player)
  player: Player;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Character)
  character: Character;
}
