import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import {
  booksFetchSuccess,
  deleteBookAPI,
  deleteBookAPISuccess,
  invokeBookAPI,
  saveBookAPI,
  saveBookAPISuccess,
  updateBookAPI,
  updateBookAPISuccess,
} from '../state/books.action';
import { mergeMap, map, switchMap, withLatestFrom, EMPTY } from 'rxjs';
import { BookService } from './book.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { setAPIStatus } from 'src/app/shared/shared.action';
import { bookSelector } from '../state/books.selector';
@Injectable({
  providedIn: 'root',
})
export class BookEffects {
  constructor(
    private appStore: Store<AppState>,
    private store: Store,
    private service: BookService,
    private action$: Actions
  ) {}

  loadData$ = createEffect(() =>
    this.action$.pipe(
      ofType(invokeBookAPI),
      withLatestFrom(this.store.pipe(select(bookSelector))),
      mergeMap(([, bookFromStore]) => {
        if (bookFromStore.length > 0) {
          return EMPTY;
        }
        return this.service
          .get()
          .pipe(map((data) => booksFetchSuccess({ allBooks: data })));
      })
    )
  );
  createBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(saveBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.service.post(action.book).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '200', apiStatus: 'success' },
              })
            );

            return saveBookAPISuccess({ book: data });
          })
        );
      })
    )
  );
  updateBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.service.update(action.book).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '200', apiStatus: 'success' },
              })
            );

            return updateBookAPISuccess({ book: data });
          })
        );
      })
    )
  );
  deleteBook$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.service.delete(action.id).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '200', apiStatus: 'success' },
              })
            );

            return deleteBookAPISuccess({ id: action.id });
          })
        );
      })
    )
  );
}
