import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piloto } from '../models/piloto.model';
import { API_BASE_URL } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class PilotoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_BASE_URL}/pilotos`;

  list(): Observable<Piloto[]> {
    return this.http.get<Piloto[]>(this.baseUrl);
  }

  get(id: number): Observable<Piloto> {
    return this.http.get<Piloto>(`${this.baseUrl}/${id}`);
  }

  create(piloto: Partial<Piloto>): Observable<Piloto> {
    return this.http.post<Piloto>(this.baseUrl, piloto);
  }

  update(id: number, piloto: Partial<Piloto>): Observable<Piloto> {
    return this.http.put<Piloto>(`${this.baseUrl}/${id}`, piloto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}