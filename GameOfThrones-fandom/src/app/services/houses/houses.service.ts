import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from 'src/app/models/House';
import { CacheService } from '../cache';

const cacheKey = 'requests';

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  houses: House[] = localStorage.houses ? JSON.parse(localStorage.houses) : [];

  constructor(private http: HttpClient, private cache: CacheService) {}

  async fetchData(page = 1, limit = 100) {
    // return new Promise((resolve) => {
    //   const requestCache = this.cache.getByKey(cacheKey);
    //   const endpoint = `https://www.anapioficeandfire.com/api/houses?pageSize=100&page=${page}`;
    //   if (requestCache[endpoint]) {
    //     this.houses = this.houses.concat(requestCache[endpoint])
    //     return resolve(this.houses)
    //   }
    //   this.http.get<House[]>(endpoint).subscribe(async (data) => {
    //     this.cache.saveByKey(cacheKey, {[endpoint]: data})
    //     this.houses.concat(data)
    //     resolve(data)
    //   })
    // })
  }

  async getHouses(page = 1, limit = 100) {
    if (!this.houses.length) {
      await this.fetchData(page, limit);
    }

    return this.houses;
  }
}
