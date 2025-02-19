import { Guide } from "./guide";

export interface User {
  email: string;
  favoriteGuides: Guide[];
  userGuides: Guide[];
  role: string;
}