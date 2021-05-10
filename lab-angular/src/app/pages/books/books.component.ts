import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  filter: string = ""

  get filteredBooks() {
    return this.filter ? this.books.filter(book => book.name.toLowerCase().includes(this.filter.toLowerCase())): this.books;
  }

  constructor(private booksService: BooksService) { }


  ngOnInit(): void {
    this.booksService.getBooks().then(data => {
      console.log(data)
      this.books = data
    })
  }

}
