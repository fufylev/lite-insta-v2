import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AuthDispatcher } from '../../store/auth/actions';
import { useHttp } from '../../hooks/http.hook';

interface Props {}

const Register: React.FC<Props> = () => {
  const { request, error } = useHttp();
  const dispatch = useDispatch();
  const rootDispatcher = new AuthDispatcher(dispatch);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async () => {
    const requestBody = {
      query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
              token
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
        rootDispatcher.register({
          userId: data.createUser._id,
          token: data.createUser.token,
          email: data.createUser.email,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="row center form__custom">
      <form className="col s12">
        <h3>Register</h3>
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
          SUBMIT
          <i className="material-icons right">person_add</i>
        </button>
      </form>
      <div className="col s12 mt2r">
        <span>Already have an account?</span> &ensp; <NavLink to='/auth'>Sign In</NavLink>
      </div>
    </div>
  );
};

export default Register;
