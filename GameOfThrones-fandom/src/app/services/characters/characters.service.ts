import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { range, pick } from 'ramda';
import { Character } from '../../models/Character';
import { CacheService } from '../cache';

const pageSize = 50;
const totalPages = 43;

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  characters: Record<string, Character> = localStorage.characters
    ? JSON.parse(localStorage.characters)
    : {};

  currentPage = 1;

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  async fetchData(page = 1) {
    if (page > totalPages) {
      return this.characters;
    }

    const endpoint = `https://www.anapioficeandfire.com/api/characters?pageSize=${pageSize}&page=${page}`;
    if (!this.cacheService.hasKey(endpoint)) {
      const dataFromApi = await this.http.get<Character[]>(endpoint).toPromise();
      this.cacheService.saveByKey(endpoint, dataFromApi);
    }

    const data = this.cacheService.getByKey<Character[]>(endpoint);

    const adaptedCharacters = data.reduce((acc, character) => {
      const characterId = character.url.split('/').pop() as string;
      return {
        ...acc,
        [characterId]: character,
      };
    }, {});

    this.characters = {
      ...this.characters,
      ...adaptedCharacters,
    };

    return this.characters;
  }

  async getCharacters(page = 1): Promise<Record<string, Character>> {
    const firstIxInChunk = (page - 1) * pageSize + 1;
    console.log('firstInChunk', firstIxInChunk)
    if (!this.characters[firstIxInChunk]) {
      await this.fetchData(page);
    }
    console.log('characters', this.characters);

    // See docs: https://ramdajs.com/docs/#range
    const idsRange = range(firstIxInChunk, firstIxInChunk + pageSize);
    console.log({idsRange, pageSize});

    // See docs: https://ramdajs.com/docs/#pick
    const pageItems = pick(idsRange, this.characters);
    console.log(pageItems);

    localStorage.characters = JSON.stringify(this.characters);

    return pageItems;
  }

  async getCharacter(characterId: string | number): Promise<Character> {
    if (this.characters[characterId]) {
      return this.characters[characterId];
    }

    const endpoint = `https://www.anapioficeandfire.com/api/characters/${characterId}`;
    if (!this.cacheService.hasKey(endpoint)) {
      const data = await this.http.get<Character>(endpoint).toPromise();
      this.cacheService.saveByKey(endpoint, data);
    }

    return this.cacheService.getByKey<Character>(endpoint);
  }
}
