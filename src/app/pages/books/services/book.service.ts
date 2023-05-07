import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookModel } from '../bookModel';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<BookModel>('http://localhost:3000/books');
  }
  post(book: BookModel) {
    return this.http.post<BookModel>('http://localhost:3000/books', book);
  }
  update(book: BookModel) {
    return this.http.put<BookModel>(
      `http://localhost:3000/books/${book.id}`,
      book
    );
  }
  delete(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
