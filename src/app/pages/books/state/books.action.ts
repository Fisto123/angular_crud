import { createAction } from '@ngrx/store';
import { props } from '@ngrx/store';
import { BookModel } from '../bookModel';
const INVOKE_BOOK_API = '[Books API] invoke books Fetch API ';
const BOOK_FETCH_SUCCESS = '[Books API] book fetch successI ';
const SAVE_BOOK_API = '[Books API] book post api ';
const SAVE_BOOK_API_SUCCESS = '[Books API] book post api success ';
const UPDATE_BOOK_API = '[Books API] book update api  ';
const UPDATE_BOOK_API_SUCCESS = '[Books API] book update api success ';
const DELETE_BOOK_API = '[Books API] book delete api  ';
const DELETE_BOOK_API_SUCCESS = '[Books API] book delete api success ';
export const invokeBookAPI = createAction(INVOKE_BOOK_API);
export const booksFetchSuccess = createAction(
  BOOK_FETCH_SUCCESS,
  props<{ allBooks: BookModel }>()
);
export const saveBookAPI = createAction(
  SAVE_BOOK_API,
  props<{ book: BookModel }>()
);

export const saveBookAPISuccess = createAction(
  SAVE_BOOK_API_SUCCESS,
  props<{ book: BookModel }>()
);

export const updateBookAPI = createAction(
  UPDATE_BOOK_API,
  props<{ book: BookModel }>()
);

export const updateBookAPISuccess = createAction(
  UPDATE_BOOK_API_SUCCESS,
  props<{ book: BookModel }>()
);

export const deleteBookAPI = createAction(
  DELETE_BOOK_API,
  props<{ id: number }>()
);

export const deleteBookAPISuccess = createAction(
  DELETE_BOOK_API_SUCCESS,
  props<{ id: number }>()
);
