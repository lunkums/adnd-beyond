import { Character } from "../character/character.interface";
import { Player } from "../player/player.interface";

export interface Profile {
  readonly player: Player;
  readonly character: Character;
}
