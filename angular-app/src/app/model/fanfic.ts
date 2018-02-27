import {User} from "./user";
import {ChapterComponent} from "../components/chapter/chapter.component";

export class Fanfic {
  id: number;
  title: string;
  userId: number;
  description: string;
  genre: string;
  image = 'http://res.cloudinary.com/soaringbird/image/upload/v1519734001/FreeVector-Book-Icon.jpg';
  tags: string[] = [];
  chapters: ChapterComponent[] = [];
}

