import { IsString } from "class-validator";

export class Player {
  @IsString()
  name: string;
}
