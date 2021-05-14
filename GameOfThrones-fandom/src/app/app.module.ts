import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksService } from './services/books';
import { HousesService } from './services/houses';
import { CacheService } from './services/cache';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CharactersService } from './services/characters/characters.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CardModule,
    FormsModule,
  ],
  providers: [BooksService, HousesService, CacheService, CharactersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
