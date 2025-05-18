import { User } from "./user";

export interface Comment {
    _id: string;
  content: string; // contentId
  user: User
  text: string;
  createdAt: string;
  moderated: boolean;
}
