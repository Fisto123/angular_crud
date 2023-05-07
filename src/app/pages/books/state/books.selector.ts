import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.state';
import { BookModel } from '../bookModel';

const bookFeatureSelector = createFeatureSelector<BookState>('books');

export const bookSelector = createSelector(bookFeatureSelector, (state) => {
  return state.books;
});
export const selectBookById = (bookId: number) => {
  return createSelector(bookSelector, (books: BookModel[]) => {
    let bookById = books.filter((_) => _.id == bookId);
    if (bookById.length == 0) {
      return null;
    }
    return bookById[0];
  });
};
