import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import {CharacterComponent} from './character/character.component';

@NgModule({
    declarations: [BookComponent, CharacterComponent],
    imports: [
        CommonModule,
        BookRoutingModule,
        TableModule,
        DataViewModule,
        FieldsetModule,
        ProgressSpinnerModule,
    ]
})
export class BookModule {}
