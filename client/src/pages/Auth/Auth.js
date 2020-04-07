import './Auth.scss';

import React, { useState } from 'react';
import { MDBBtn, MDBInput, MDBLink, MDBAlert } from 'mdbreact';
import { inject, observer } from 'mobx-react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import { useHttp } from '../../hooks/http.hook';

const Auth = (props) => {
  const { loading, request, error } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  const onChangeHandler = event => {
    const { name } = event.target;
    setForm({ ...form, [name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = await request('http://localhost:5000/api/auth/login', 'POST', { ...form });
      console.log(data);
      props.User.login(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div>
      <div className='container mt-5 form__custom'>
        <form onSubmit={submitHandler}>
          <p className="h3 text-center mb-4">Login</p>
          <div className="grey-text">
            <MDBInput
              name='email'
              label="Email"
              icon="envelope"
              group
              type="email"
              validate error="wrong"
              success="right"
              value={form.email}
              onChange={onChangeHandler}
              className='form__custom-input'
            />
            <MDBInput
              name='password'
              label="Password"
              icon="lock"
              group
              type="password"
              validate
              value={form.password}
              onChange={onChangeHandler}
              className='form__custom-input'
            />
          </div>
        {error && <MDBAlert color="danger" className='form-alert'>{error}</MDBAlert>}
          <div className="text-center">
            <MDBBtn type="submit" disabled={loading}>Login</MDBBtn>
          </div>
        </form>
        <div className='mt-5 grey-text d-flex justify-content-center align-items-center'>
          <span>Don't have an account?</span>
          <MDBLink to="/register" className='blue-text ml-1'>
            Sign Up
          </MDBLink>
        </div>
        <div className='mt-5 d-flex justify-content-center align-items-center'>
          <FacebookLogin
            appId="171337443925766"
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
      </div>
    </div>
  );
};

Auth.propTypes = {
  User: PropTypes.object,
};

export default inject('User')(observer(Auth));
