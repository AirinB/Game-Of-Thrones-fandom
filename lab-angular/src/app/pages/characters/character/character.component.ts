import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../../models/Character';


@Component({
  selector: 'app-characterList',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.sass']
})
export class CharacterComponent implements OnInit {
  @Input() public characters: Character[] | void = undefined;

  @Input()
  title = '';

  get charactersKeys(): string[] {
    if (this.characters && this.characters.length) {
      return Object.keys(this.characters[0]);
    }
    return [];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
