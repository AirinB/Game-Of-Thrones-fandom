import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import {CharacterComponent} from './character/character.component';
import {TableModule} from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {FieldsetModule} from 'primeng/fieldset';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [
    CharactersComponent, CharacterComponent
  ],
    imports: [
        CommonModule,
        CharactersRoutingModule,
        TableModule,
        DataViewModule,
        FieldsetModule,
        ProgressSpinnerModule,
        PaginatorModule
    ]
})
export class CharactersModule { }
