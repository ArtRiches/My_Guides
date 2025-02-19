import { Injectable } from '@angular/core';

const JWT = "JWT";

@Injectable({
  providedIn: 'root',
})
export class JWTRepository {
  constructor() {}

  getToken(): string | undefined {
    const key = localStorage.getItem(JWT);
    return key ? JSON.parse(key) : undefined;
  }

  add(token: string): void {
    localStorage.setItem(JWT, JSON.stringify(token));
  }

  clear(): void {
    localStorage.removeItem(JWT);
  }

  isAuth(): boolean {
    return this.getToken() != undefined;
  }
}
