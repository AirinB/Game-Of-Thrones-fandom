import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/Character';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private data: Record<string, unknown> = {};

  constructor() {
    this.data = localStorage.requests ? JSON.parse(localStorage.requests) : {};
  }

  getByKey<T>(key: string): T {
    return this.data[key] as T;
  }

  saveByKey(key: string, data: [] | {}) {
    this.data[key] = data;
    localStorage.requests = JSON.stringify(this.data);
  }

  hasKey(key: string): boolean {
    return this.data.hasOwnProperty(key);
  }
}
