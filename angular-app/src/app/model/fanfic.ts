import {User} from "./user";
import {Tag} from "./tag";
import {Chapter} from "./chapter";

export interface Fanfic {
  id: number,
  title: string,
  user: User,
  date: Date,
  description: string,
  genre: string,
  image: String,
  tags: Tag[],
  chapters: Chapter[]
}
