import { createReducer, on } from '@ngrx/store';
import { initialState } from './book.state';
import {
  booksFetchSuccess,
  deleteBookAPISuccess,
  saveBookAPISuccess,
  updateBookAPISuccess,
} from './books.action';

export const _bookReducer = createReducer(
  initialState,
  on(booksFetchSuccess, (state: any, action: any) => {
    return {
      ...state,
      books: action.allBooks,
    };
  }),
  on(saveBookAPISuccess, (state, action) => {
    return {
      ...state,
      books: [...state.books, action.book],
    };
  }),
  on(updateBookAPISuccess, (state, action) => {
    let updatedUser = state.books.map((book) => {
      return book.id === action.book.id ? action.book : book;
    });
    return {
      ...state,
      books: updatedUser,
    };
  }),
  on(deleteBookAPISuccess, (state, action) => {
    let updatedUser = state.books.filter((book) => {
      return book.id !== book.id;
    });
    return {
      ...state,
      books: updatedUser,
    };
  })
);

export const bookReducer = (state: any, action: any) => {
  return _bookReducer(state, action);
};
