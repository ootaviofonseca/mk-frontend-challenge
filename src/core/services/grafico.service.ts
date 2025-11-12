import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export interface Reading {
  timestamp: string;
  value: number;
}

export interface Grafico {
  id: string;
  deviceId: string;
  type: string;
  metric:  string;
  unit:  string;
  readings: Reading[];
}

@Injectable({ providedIn: 'root' })
export class GraficoService {
  private baseUrl = 'http://localhost:3000/charts';

  constructor(private http: HttpClient) {}

  getGraficos(): Observable<Grafico[]> {
    return this.http.get<Grafico[]>(this.baseUrl);
  }

}
