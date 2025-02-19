import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }

  // public getCsrfToken(): any {
  //   return this.http.get<any>(`${this.apiServerUrl}/csrf`);
  // }

  public login(email: string, password: string): Observable<string> {
    return this.http.post(`${this.apiServerUrl}/auth`, {email, password}, { responseType: 'text'});
  }

  public registration(email: string, password: string): Observable<string> {
    return this.http.post(`${this.apiServerUrl}/registration`, {email, password}, { responseType: 'text'});
  }

}