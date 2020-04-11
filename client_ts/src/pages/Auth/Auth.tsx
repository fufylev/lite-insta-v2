import './Auth.scss';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, InputLabel, Link, TextField } from '@material-ui/core';
import { Button, FormControl, InputAdornment, OutlinedInput } from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons/';
import { Alert } from '@material-ui/lab/';
import { AuthDispatcher } from '../../store/auth/actions';
import { useHttp } from '../../hooks/http.hook';
// @ts-ignore
import FacebookLogin from 'react-facebook-login';

interface Props {
}

export interface IFacebook {
  userID: string,
  accessToken: string,
  picture: {
    data: {
      url: string
    }
  },
  name: string,
  email: string,
}

const Auth: React.FC<Props> = () => {
  const { request, error } = useHttp();
  const [form, setForm] = useState({ email: '', password: '', showPassword: false });

  const dispatch = useDispatch();
  const rootDispatcher = new AuthDispatcher(dispatch);

  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      const data = await request('http://localhost:5000/api/auth/login', 'POST', { ...form });
      rootDispatcher.logon({ userId: data.userId, token: data.token });
    } catch (e) {
      console.log(e);
    }
  };

  const responseFacebook = (response: IFacebook) => {
    console.log(response);
    const { name, email, accessToken, userID, picture } = response;

    rootDispatcher.loginWithFacebook({
      avatar: picture.data.url,
      name,
      email,
      token: accessToken,
      userId: userID,
    });
  };

  return (
    <div>
      <div className=''>
        <form>
          <p className="">Login</p>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={(e) => changeHandler(e)}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={form.showPassword ? 'text' : 'password'}
              value={form.password}
              name="password"
              onChange={(e) => changeHandler(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setForm({ ...form, showPassword: !form.showPassword })}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {form.showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          {error && <Alert severity="error">{error}</Alert>}
          <div className="text-center">
            <Button variant="outlined" color="primary" onClick={(e) => {
              e.preventDefault();
              submitHandler();
            }}>
              Login
            </Button>
          </div>
        </form>
        <div className=''>
          <span>Don't have an account?</span>
          <Link href="/register" color="inherit">
            Sign Up
          </Link>
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

export default Auth;
