import './App.scss'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import Header from './components/Header/Header'
import SpinnerPage from './components/Loader/Loader'
import { useRoutes } from './routes'

function App (props) {
  const { isAuthenticated, ready } = props.User

  useEffect(() => {
    props.User.checkUser()
  })

  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <SpinnerPage />
  }

  return (
    <div className=''>
      { isAuthenticated && <Header /> }
      <div className="container">
        {routes}
      </div>
    </div>
  )
}

App.propTypes = {
  User: PropTypes.object
}

export default inject('User')(observer(App))
