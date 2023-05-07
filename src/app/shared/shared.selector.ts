import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, SharedState } from './app.state';

const appFeatureSelector = createFeatureSelector<SharedState>('appstate');

export const appSelector = createSelector(appFeatureSelector, (state) => {
  return state.apiStatus;
});
