import {Fanfic} from "./fanfic";

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  token: string;
  role: string;
  isSendConfirm: boolean;
  isBlocked: boolean;
  fanfics: Fanfic[];
}
