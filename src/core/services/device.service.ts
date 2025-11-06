import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Device {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  lastUpdate: string;
}

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private baseUrl = 'http://localhost:3000/devices';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.baseUrl);
  }

  createDevice(device: Omit<Device, 'id'>): Observable<Device> {
    return this.http.post<Device>(this.baseUrl, device);
  }

  updateDevice(id: string, device: Partial<Device>): Observable<Device> {
    return this.http.put<Device>(`${this.baseUrl}/${id}`, device);
  }

  deleteDevice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}