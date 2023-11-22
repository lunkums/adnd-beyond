import { Profile } from "./profile";

export type ImportEvent = CustomEvent<ImportEventArgs>;

export interface ImportEventArgs {
  profile: Profile;
}
