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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
