import { Guide } from "./guides";

export interface Users {
    email: string;
    password: string;
    favoriteGuides: Guide[];
    userGuides: Guide[];
}

const ADMIN: Users = {
    email: "admin@gmail.com",
    password: "Admin111",
    favoriteGuides: [],
    userGuides: []
}

const IVAN: Users = {
    email: "ivan@gmail.com",
    password: "Ivan1111",
    favoriteGuides: [],
    userGuides: []
}

export const UsersList: Users[] = [ADMIN, IVAN];