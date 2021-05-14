import { Component, OnInit } from '@angular/core';
import {CharactersService} from '../../services/characters/characters.service';
import {Character} from '../../models/Character';


type PaginatorEvent = {
  page: number
};

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.sass']
})
export class CharactersComponent implements OnInit {
  public characters: Character[] = [];
  private currentPage = 1;
  constructor(
      private charactersService: CharactersService
  ) {

  }

  paginate(event: PaginatorEvent): void {
    console.log('hello world', event);
    this.currentPage = event.page + 1;
    this.fetchCharacters()
    // event.first = Index of the first record
    // event.rows = Number of rows to display in new page
    // event.page = Index of the new page
    // event.pageCount = Total number of pages
  }

  ngOnInit(): void {
   this.fetchCharacters()
  }

  fetchCharacters(): void{
    this.charactersService.getCharacters(this.currentPage).then( (result) => {this.characters = Object.values(result);} );
  }
}
