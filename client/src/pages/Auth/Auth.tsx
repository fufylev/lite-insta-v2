import './Auth.scss';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AuthDispatcher } from '../../store/auth/actions';
import { useHttp } from '../../hooks/http.hook';
import { NavLink } from 'react-router-dom';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

interface Props {
}

const Auth: React.FC<Props> = () => {
  const { request, error } = useHttp();
  const dispatch = useDispatch();
  const rootDispatcher = new AuthDispatcher(dispatch);

  const submitHandler = async () => {
    const email = setEmail.current!.value;
    const password = setPassword.current!.value;
    try {
      const data = await request('http://localhost:5000/api/auth/login', 'POST', { email, password });
      rootDispatcher.logon({ userId: data.userId, token: data.token });
    } catch (e) {
      console.log(e);
    }
  };

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    const { name, email, accessToken, id, picture } = response;

    rootDispatcher.loginWithFacebook({
      avatar: picture?.data.url,
      name,
      email,
      token: accessToken,
      userId: id,
    });
  };

  const setEmail = useRef<HTMLInputElement>(null);
  const setPassword = useRef<HTMLInputElement>(null);

  return (
    <div className="row center form__custom">
      <form className="col s12">
        <h3>Login</h3>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input
              id="icon_prefix"
              type="text"
              className="validate"
              ref={setEmail}
            />
            <label htmlFor="icon_prefix">Email</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input
              id="password"
              type="password"
              className="validate"
              ref={setPassword}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        {error && <div className='form-error'>{error}</div>}
        <button
          className="btn waves-effect waves-light btn-large"
          onClick={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          LOGIN
          <i className="material-icons right">input</i>
        </button>
      </form>
      <div className="col s12 mt2r">
        <span>Don't have an account?</span> &ensp; <NavLink to='/register'>Sign Up</NavLink>
      </div>
      <div className="col s12 facebook-login">
        <FacebookLogin
          appId="171337443925766"
          fields="name,email,picture"
          callback={(response) => responseFacebook(response)}
        />
      </div>
    </div>
  );
};

export default Auth;