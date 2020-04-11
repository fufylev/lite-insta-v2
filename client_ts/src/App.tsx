import './App.scss'
import React from 'react'
import { useRoutes } from './routes';
import { useSelector} from "react-redux";
import { InitialState } from './store/auth/reducer';

interface Props {
}

interface StateProps {
  isAuthenticated: boolean
}

const App: React.FC<Props> = () => {
  const {isAuthenticated} = useSelector<InitialState, StateProps>((state: InitialState) => {
    return {
      isAuthenticated: state.isAuthenticated,
    }
  });

  console.log(`isAuthenticated - ${isAuthenticated}`)

  const isAuthenticated1: boolean = false;
  const routes = useRoutes(isAuthenticated1);

  return (
    <div className="container">
      {routes}
    </div>
  );
};

export default App
