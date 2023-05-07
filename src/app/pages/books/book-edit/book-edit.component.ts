import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../state/books.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { updateBookAPI } from '../state/books.action';
import { AppState } from 'src/app/shared/app.state';
import { appSelector } from 'src/app/shared/shared.selector';
import { setAPIStatus } from 'src/app/shared/shared.action';

@Component({
  selector: 'hin-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css'],
})
export class BookEditComponent {
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private appStore: Store<AppState>
  ) {}
  bookForm: any = {
    title: '',
    cost: 0,
    author: '',
  };
  ngOnInit(): void {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        var id = Number(param.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );
    fetchFormData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  updateForm() {
    this.store.dispatch(updateBookAPI({ book: this.bookForm }));
    let appStatus$ = this.appStore.pipe(select(appSelector));
    appStatus$.subscribe((data) => {
      this.appStore.dispatch(
        setAPIStatus({
          apiStatus: { apiResponseMessage: '', apiStatus: '' },
        })
      );
      if (data === 'success') {
        this.router.navigate(['/']);
      }
    });
  }
}
