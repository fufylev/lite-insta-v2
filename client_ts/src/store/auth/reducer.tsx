import { Action, Reducer } from 'redux';
import { ActionType } from './types';

export interface InitialState {
  userId: string,
  token: string,
  avatar: string,
  name: string,
  email: string,
  isAuthenticated: boolean
}

export const initialState: InitialState = {
  userId: '',
  token: '',
  avatar: '',
  name: '',
  email: '',
  isAuthenticated: false,
};

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export const authReducer: Reducer<InitialState, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.Login:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token || '',
        userId: action.payload.userId || '',
      };

    case ActionType.Register:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token || '',
        userId: action.payload.userId || '',
      };

    case ActionType.LogOut:
      return { ...state, ...initialState };

    default:
      return state;
  }
};