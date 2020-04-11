import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import MainPage from './pages/MainPage/MainPage';
import Register from './pages/Register/Register';
import User from './pages/User/User';
import Gallery from './pages/Gallery/Gallery';

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage/>
        </Route>
        <Route path="/user">
          <User/>
        </Route>
        <Route path="/explore">
          <Gallery/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/auth" exact>
        <Auth/>
      </Route>
      <Route path="/register" exact>
        <Register/>
      </Route>
      <Redirect to="/auth"/>
    </Switch>
  );
};
