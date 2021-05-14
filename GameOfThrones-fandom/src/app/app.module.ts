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
import { HousesComponent } from './components/houses/houses.component';
import { CharactersService } from './services/characters/characters.service';
import { HouseComponent } from './components/houses/house/house.component';

@NgModule({
  declarations: [AppComponent, HousesComponent, HouseComponent],
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
