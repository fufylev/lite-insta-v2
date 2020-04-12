import { Dispatch } from 'redux';
import { DispatchAction } from './reducer';
import { ActionType } from './types';

export interface IParams {
  userId: string,
  token: string,
  avatar: string | undefined,
  name: string | undefined,
  email: string | undefined,
}

export class AuthDispatcher {

  private readonly dispatch: Dispatch<DispatchAction>;

  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  logon = ({ userId, token }: { userId: string, token: string }) => this.dispatch({
    type: ActionType.Login,
    payload: { userId, token },
  });

  register = ({ userId, token }: { userId: string, token: string }) => this.dispatch({
    type: ActionType.Login,
    payload: { userId, token },
  });

  logout = () => this.dispatch({ type: ActionType.LogOut, payload: {} });

  loginWithFacebook = ({ avatar, name, email, token, userId }: IParams) => this.dispatch({
    type: ActionType.LoginWithFacebook,
    payload: { avatar, name, email, token, userId },
  });
}