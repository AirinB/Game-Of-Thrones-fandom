import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { House } from 'src/app/models/House';
import { CacheService } from '../cache';
import {Character} from '../../models/Character';
import {pick, range} from 'ramda';

const cacheKey = 'requests';
const totalPages = 9;
const pageSize = 50;

@Injectable({
  providedIn: 'root',
})
export class HousesService {
  houses: Record<string, House> = localStorage.houses
      ? JSON.parse(localStorage.houses)
      : {};

  // add HTTPClient as attributes and CacheService
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  async fetchData(page = 1, limit = 100): Promise<Record<string, House>> {
    if (page > totalPages) {
      // return all houses that we have
      return this.houses;
    }

    const endpoint = `https://www.anapioficeandfire.com/api/houses?pageSize=${pageSize}&page=${page}`;
    if (!this.cacheService.hasKey(endpoint)) {
      const dataFromApi = await this.http.get<House[]>(endpoint).toPromise(); // make the request
      this.cacheService.saveByKey(endpoint, dataFromApi); // safe to the local storage
    }

    const data = this.cacheService.getByKey<House[]>(endpoint); // load data from the local storage

    const adaptedHouses = data.reduce((acc, house) => {
      const houseId = house.url.split('/').pop() as string; // take last element from the link (which is the ID)
      return {
        ...acc,
        [houseId]: house,
      };
    }, {});

    this.houses = {
      ...this.houses,
      ...adaptedHouses,
    };

    return this.houses;
  }

  async getHouses(page = 1): Promise<Record<string, House>>  {
    const firstIxInChunk = (page - 1) * pageSize + 1;

    if (!this.houses[firstIxInChunk]) {
      await this.fetchData(page);
    }
    console.log('characters', this.houses);

    // See docs: https://ramdajs.com/docs/#range
    const idsRange = range(firstIxInChunk, firstIxInChunk + pageSize);

    // See docs: https://ramdajs.com/docs/#pick
    const pageItems = pick(idsRange, this.houses);
    console.log(pageItems);

    localStorage.houses = JSON.stringify(this.houses);

    return pageItems;
  }


  async getHouse(housesId: string | number): Promise<House> {
    if (this.houses[housesId]) {
      return this.houses[housesId];
    }

    const endpoint = `https://www.anapioficeandfire.com/api/houses/${housesId}`;
    if (!this.cacheService.hasKey(endpoint)) {
      const data = await this.http.get<House>(endpoint).toPromise();
      this.cacheService.saveByKey(endpoint, data);
    }

    return this.cacheService.getByKey<House>(endpoint);
  }

}
