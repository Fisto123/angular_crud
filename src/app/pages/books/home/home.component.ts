import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookModel } from '../bookModel';
import { deleteBookAPI, invokeBookAPI } from '../state/books.action';
import { bookSelector } from '../state/books.selector';
import { setAPIStatus } from 'src/app/shared/shared.action';
import { AppState } from 'src/app/shared/app.state';
import { appSelector } from 'src/app/shared/shared.selector';
import { Router } from '@angular/router';
declare var window: any;

@Component({
  selector: 'hin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  books$!: Observable<BookModel[]>;
  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router
  ) {}
  deleteModal: any;
  idToDelete: number = 0;
  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.store.dispatch(invokeBookAPI());
    this.books$ = this.store.select(bookSelector);
  }
  openDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }
  confirmDelete() {
    this.store.dispatch(deleteBookAPI({ id: this.idToDelete }));
    let appStatus$ = this.appStore.pipe(select(appSelector));
    appStatus$.subscribe((data) => {
      this.appStore.dispatch(
        setAPIStatus({
          apiStatus: { apiResponseMessage: '', apiStatus: '' },
        })
      );

      this.deleteModal.hide();
    });
  }
}
