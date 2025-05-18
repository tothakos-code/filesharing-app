import { User } from './user';
import { Category } from './category';

export interface Rating {
  user: User;
  value: number;
}

export interface Content {
  _id: string;
  title: string;
  description: string;
  category: Category;
  filePath: string;
  uploadedBy: User;
  createdAt: string;
  ratings: Rating[];
  averageRating: number;
  ratingsCount: number;
}
