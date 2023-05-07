import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';
import { setAPIStatus } from './shared.action';

const _appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, { apiStatus }) => {
    return apiStatus;
  })
);
export const appReducer = (state: any, action: any) => {
  return _appReducer(state, action);
};
