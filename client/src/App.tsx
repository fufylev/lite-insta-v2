import './App.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from './store';
import { useRoutes } from './routes';
import Header from './components/Header/Header';

interface Props {
}

const App: React.FC<Props> = () => {
  const auth = useSelector((state: AppState) => state.auth);
  const { isAuthenticated } = auth;

  const routes = useRoutes(isAuthenticated);

  return (
    <div>
      { isAuthenticated && <Header /> }
      {routes}
    </div>
  );
};

export default App;
