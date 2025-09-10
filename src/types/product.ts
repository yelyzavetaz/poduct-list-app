import type { Comment } from "./comment";
import type { Size } from "./size";

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: number;
  comments: Comment[];
}
