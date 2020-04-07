import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import User from './stores/user'
import 'mdbootstrap/css/mdb.min.css'

const stores = {
  User
}

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'))
