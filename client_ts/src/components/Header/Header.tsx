import './Header.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthDispatcher } from '../../store/auth/actions';

interface Props {
}

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const rootDispatcher = new AuthDispatcher(dispatch);

  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <NavLink to='/' className="brand-logo">
              <i className="large material-icons">camera</i>
              <span className="">LiteInsta</span>
            </NavLink>
            <ul className="right hide-on-med-and-down">
              <li>
                <NavLink to="/explore" >
                  <i className="large material-icons">filter</i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/user" >
                  <i className="material-icons">account_circle</i>
                </NavLink>
              </li>
              <li>
                <NavLink to="#" onClick={() => rootDispatcher.logout()} className="log-out" >
                  Log out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;