import './Header.scss'
import React from 'react'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
} from 'mdbreact'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

function Header(props) {
  const bgPink = { backgroundColor: '#e95a8c' }

  return (
    <header className='container'>
      <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
        <MDBNavbarBrand href="/">
          <i className="fab fa-instagram fa-2x"></i>
        </MDBNavbarBrand>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/" className='header-link d-none d-md-block font-weight-bold'>
                LiteInsta
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right >
            <div className='d-flex justify-content-center align-items-center'>
              <MDBNavItem>
                <MDBNavLink to="/explore">
                  <i className="far fa-compass fa-2x"></i>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/user">
                  <i className="fas fa-user-circle fa-2x mx-3"></i>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem >
                <MDBNavLink to="#" onClick={() => props.User.logout()}>
                  <i className="fas fa-sign-out-alt fa-2x"></i>
                </MDBNavLink>
              </MDBNavItem>
            </div>
          </MDBNavbarNav>
      </MDBNavbar>
    </header>
  );
}

Header.propTypes = {
  User: PropTypes.object,
};

export default inject('User')(observer(Header));