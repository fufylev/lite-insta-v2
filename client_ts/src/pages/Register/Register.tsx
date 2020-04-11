import React, { ChangeEvent, useState } from 'react';
import { MDBAlert, MDBBtn, MDBInput, MDBLink } from 'mdbreact';
import { useHttp } from '../../hooks/http.hook';
// import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

interface Props {

}

const Register: React.FC<Props> = () =>  {
  const { loading, request, error } = useHttp();
  const [form, setForm] = useState({ email: '', password: '' });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setForm({ ...form, [name]: event.target.value });
  };

  const submitHandler = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    try {
      const data = await request('http://localhost:5000/api/auth/register', 'POST', { ...form });
      // props.User.setUser(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className='container mt-5 form__custom'>
        <form onSubmit={() => submitHandler}>
          <p className="h3 text-center mb-4">Register</p>
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
              onChange={() => onChangeHandler}
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
              onChange={() => onChangeHandler}
              className='form__custom-input'
            />
          </div>
          {error && <MDBAlert color="danger" className='form-alert'>{error}</MDBAlert>}
          <div className="text-center">
            <MDBBtn type="submit" disabled={loading}>Register</MDBBtn>
          </div>
        </form>
        <div className='mt-5 grey-text d-flex justify-content-center align-items-center'>
          <span>Have an account?</span>
          <MDBLink to="/auth" className='blue-text ml-1'>
            Sign In
          </MDBLink>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
};

export default Register;
