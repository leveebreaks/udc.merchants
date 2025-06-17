import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Merchant } from '../../models/merchant.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MerchantService {
  private baseUrl = 'http://localhost:5297/api/merchants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(this.baseUrl);
  }

  create(merchant: Omit<Merchant, 'id' | 'createdAt'>): Observable<Merchant> {
    return this.http.post<Merchant>(this.baseUrl, merchant);
  }

  update(id: number, merchant: Partial<Merchant>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, merchant);
  }

  delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
}