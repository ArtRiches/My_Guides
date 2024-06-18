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

const USER1: Users = {
    email: "user1@gmail.com",
    password: "User1111",
    favoriteGuides: [],
    userGuides: []
}

export const UsersList: Users[] = [ADMIN, USER1];