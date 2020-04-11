import { DispatchAction, InitialState, authReducer } from './reducer';
import { createStore, Reducer, combineReducers } from 'redux';

export interface ApplicationState {
  auth: InitialState,
}

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  auth: authReducer,
});


export const store = createStore<InitialState, DispatchAction, null, null>(authReducer);