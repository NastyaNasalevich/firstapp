import {CommentComponent} from "../components/comment/comment.component";

export class Chapter {
  id: number;
  title: string;
  content: "";
  userId: number;
  rating = 0;
  isRated = true;
  comments: CommentComponent[] = [];
  fanficId: number;
}

