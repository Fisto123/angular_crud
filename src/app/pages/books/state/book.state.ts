import { BookModel } from '../bookModel';

export interface BookState {
  books: BookModel[];
}
export const initialState: BookState = {
  books: [],
};
