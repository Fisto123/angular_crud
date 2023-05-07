import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { bookReducer } from './state/books.reducer';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './services/book.effects';
import { BookaddComponent } from './bookadd/bookadd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookEditComponent } from './book-edit/book-edit.component';
@NgModule({
  declarations: [HomeComponent, BookaddComponent, BookEditComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([BookEffects]),
    StoreModule.forFeature('books', bookReducer),
  ],
})
export class BooksModule {}
