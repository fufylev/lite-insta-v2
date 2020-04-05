import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import {
  MDBCollapse,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBNavItem,
  MDBNavLink
} from 'mdbreact'

function Header () {
  const [collapse, setCollapse] = useState(false)
  const bgPink = { backgroundColor: '#e95a8c' }
  return (
    <div>
      <header className='container'>
        <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
          <MDBNavbarBrand href="/">
            <strong>LiteInsta</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={() => setCollapse(!collapse)}/>
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="#">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#">User</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#">Gallery</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#">Auth</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    </div>
  )
}

Header.propTypes = {}

export default Header
