import { createAction, props } from '@ngrx/store';
import { SharedState } from './app.state';
const API_STATUS = '[API] success or failure ';

export const setAPIStatus = createAction(
  API_STATUS,
  props<{ apiStatus: SharedState }>()
);
