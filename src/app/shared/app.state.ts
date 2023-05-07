export interface SharedState {
  apiStatus: string;
  apiResponseMessage: string;
}

export interface AppState {
  shared: SharedState;
}
