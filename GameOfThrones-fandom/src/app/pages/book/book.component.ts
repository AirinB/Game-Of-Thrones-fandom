import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { keys } from 'ramda';
import { Book } from 'src/app/models/Book';
import { Character } from 'src/app/models/Character';
import { BooksService } from 'src/app/services/books';
import { CharactersService } from 'src/app/services/characters/characters.service';

type BookWithCharacters = Book & {
  charactersWithDetails?: Character[];
  povCharactersWithDetails?: Character[];
};

const omitColumns = ['url'];

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass'],
})
export class BookComponent implements OnInit {
  bookDetails: BookWithCharacters | null = null;

  characterTableKeys: (keyof Character)[] = [];

  async fetchCharacterDetails(
    key: 'characters' | 'povCharacters',
    newKey: 'charactersWithDetails' | 'povCharactersWithDetails'
  ) {
    if (!this.bookDetails) {
      return;
    }

    const characterIds = this.bookDetails[key].map((url) =>
      Number(url.split('/').pop())
    );
    const characters = [];
    for (let characterId of characterIds) {
      const chracter = await this.charactersService.getCharacter(characterId);
      characters.push(chracter);
      if (!this.characterTableKeys.length) {
        this.characterTableKeys = keys(chracter).filter(
          (key) => !omitColumns.includes(key)
        );
      }
    }
    this.bookDetails[newKey] = characters;
  }

  toString(s: string) {
    return JSON.stringify(s);
  }

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private charactersService: CharactersService
  ) {
    this.route.params.subscribe(async ({ bookId }) => {
      this.bookDetails = await booksService.getBook(bookId);

      await this.fetchCharacterDetails('characters', 'charactersWithDetails');
      await this.fetchCharacterDetails(
        'povCharacters',
        'povCharactersWithDetails'
      );
      console.log(this.bookDetails);
    });
  }

  ngOnInit(): void {}
}
