import {User} from "./user";

export class Comment {
  chapterId: number;
  user: User;
  content: string;
  dateCreated: Date;
}
