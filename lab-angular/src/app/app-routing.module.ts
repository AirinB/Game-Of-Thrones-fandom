import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () =>
      import('./pages/books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'books/:bookId',
    loadChildren: () =>
      import('./pages/book/book.module').then((m) => m.BookModule),
  },
  { path: 'characters', loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule) },
  { path: 'houses', loadChildren: () => import('./pages/houses/houses.module').then(m => m.HousesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
