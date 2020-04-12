import './Header.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthDispatcher } from '../../store/auth/actions';
import { AppState } from '../../store';

interface Props {
}

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const rootDispatcher = new AuthDispatcher(dispatch);

  const { avatar } = useSelector((state: AppState) => state.auth);

  return (
    <header>
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <NavLink to='/' className="brand-logo">
              <i className="large material-icons">camera</i>
              <span className="">LiteInsta</span>
            </NavLink>
            <ul className="right hide-on-med-and-down fjcsb">
              <li>
                <NavLink to="/explore" >
                  <i className="large material-icons">filter</i>
                </NavLink>
              </li>
              <li>
                <NavLink to="/user" className='fjcc'>
                  {!avatar && <i className="material-icons">account_circle</i>}
                  {avatar && <img src={avatar} alt="avatar" className='avatar'/>}
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