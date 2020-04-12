import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AuthDispatcher } from '../../store/auth/actions';
import { useHttp } from '../../hooks/http.hook';
import { NavLink } from 'react-router-dom';

interface Props {
}

const Register: React.FC<Props> = () => {
  const { request, error } = useHttp();
  const dispatch = useDispatch();
  const rootDispatcher = new AuthDispatcher(dispatch);

  const submitHandler = async () => {
    const email = setEmail.current!.value;
    const password = setPassword.current!.value;
    try {
      const data = await request('http://localhost:5000/api/auth/register', 'POST', { email, password });
      rootDispatcher.register({ userId: data.userId, token: data.token });
    } catch (e) {
      console.log(e);
    }
  };

  const setEmail = useRef<HTMLInputElement>(null);
  const setPassword = useRef<HTMLInputElement>(null);

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
