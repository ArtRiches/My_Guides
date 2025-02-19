import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const KEY = "user_repo"
@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor() {}

  getUser(): string | undefined {
    const user = localStorage.getItem(KEY);
    return user ? JSON.parse(user) : undefined;
  }

  add(user: string): void {
    localStorage.setItem(KEY, JSON.stringify(user));
  }

  update(user: string): void {
    localStorage.setItem(KEY, JSON.stringify(user));
  }

  clear(): void {
    localStorage.removeItem(KEY);
  }

  isAuth(): Observable<boolean>{
    return of(this.getUser() != undefined);
  }

}
