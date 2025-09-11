// src/app/services/atividades.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AtividadesService {
  private base = '/api'; // usa o proxy configurado no angular.json

  constructor(private http: HttpClient) {}

  getActivitiesByFilter(type?: string, participants?: number): Observable<any[]> {
    const params: string[] = [];
    if (type) params.push(`type=${type}`);
    if (participants) params.push(`participants=${participants}`);
    const query = params.length ? `?${params.join('&')}` : '';

    const url = `${this.base}/filter${query}`;
    console.log('🌐 Requisição para:', url);

    return this.http.get<any[]>(url).pipe(timeout(10000));
  }

  getRandom(): Observable<any> {
    return this.http.get<any>(`${this.base}/random`).pipe(timeout(10000));
  }
}
