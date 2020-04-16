import './Auth.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthDispatcher } from '../../store/auth/actions';
import { useHttp } from '../../hooks/http.hook';

interface Props {}

const Auth: React.FC<Props> = () => {
  const { request, error } = useHttp();
  const dispatch = useDispatch();
  const rootDispatcher = new AuthDispatcher(dispatch);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    const requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            email
          }
        }
      `,
      variables: {
        email: email,
        password: password,
      },
    };

    try {
      const resData = await request('/graphql', 'POST', requestBody);
      if (resData) {
        const data = resData.data;
        rootDispatcher.login({
          userId: data.login.userId,
          token: data.login.token,
          email: data.login.email,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

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
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="icon_prefix">Email</label>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={e => setPassword(e.target.value)}
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

    </div>
  );
};

export default Auth;

// import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';

{/* <div className="col s12 facebook-login">
        <FacebookLogin
          appId="171337443925766"
          fields="name,email,picture"
          callback={(response) => responseFacebook(response)}
        />
      </div> */
}

/*  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    const { name, email, accessToken, id, picture } = response;

    rootDispatcher.loginWithFacebook({
      avatar: picture?.data.url,
      name,
      email,
      token: accessToken,
      userId: id,
    });
  }; */