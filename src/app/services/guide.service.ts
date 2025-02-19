import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Guide } from '../interfaces/guide';

@Injectable({
  providedIn: 'root',
})
export class GuideService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {} 

  public getGuides(): Observable<Guide[]> {
    return this.http.get<Guide[]>(`${this.apiServerUrl}/guides`);
  }

  public addGuide(userId: number ,guide: Guide): Observable<Guide> {
    return this.http.post<Guide>(`${this.apiServerUrl}/guides`, {userId, guide});
  }

  public getGuideById(id: number): Observable<Guide> {
    return this.http.get<Guide>(`${this.apiServerUrl}/guides/${id}`);
  }

  public getGuidesByUserId(userId: number): Observable<Guide[]> {
    return this.http.get<Guide[]>(`${this.apiServerUrl}/guides/users/${userId}`);
  }

}
