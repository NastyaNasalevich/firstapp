import {Fanfic} from "./fanfic";
import {Rating} from "./rating";

export interface Chapter {
  id: number,
  title: string,
  content: string,
  fanfic: Fanfic[],
  comments: Comment[],
  ratings: Rating[]
}
