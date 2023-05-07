import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookModel } from '../bookModel';
import { Store, select } from '@ngrx/store';
import { saveBookAPI } from '../state/books.action';
import { AppState } from 'src/app/shared/app.state';
import { appSelector } from 'src/app/shared/shared.selector';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/shared.action';
@Component({
  selector: 'hin-bookadd',
  templateUrl: './bookadd.component.html',
  styleUrls: ['./bookadd.component.css'],
})
export class BookaddComponent {
  myForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private appStore: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reactiveForm();
  }
  reactiveForm() {
    this.myForm = this.fb.group({
      title: [''],
      author: ['', [Validators.required]],
      cost: ['', [Validators.required]],
    });
  }
  AddBook(book: BookModel) {
    this.store.dispatch(saveBookAPI({ book }));
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
