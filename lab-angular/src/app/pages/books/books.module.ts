import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from "primeng/card"
import { FormsModule } from '@angular/forms';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';


@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
