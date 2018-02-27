import {CommentComponent} from "../components/comment/comment.component";

export class Chapter {
  id: number;
  title: string;
  content: string;
  userId: number;
  rating = 0;
  isRated = true;
  comments: CommentComponent[] = [];
  fanficId: number;
}

