import {User} from "./user";
import {Chapter} from "./chapter";

export interface Comment {
  id: number,
  value: string,
  user: User,
  chapter: Chapter,
  date: Date
}
