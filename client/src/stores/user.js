import { action, configure, decorate, observable } from 'mobx'

configure({ enforceActions: 'observed' })

class User {
  constructor () {
    this.isAuthenticated = false
    this.isRegistered = false
    this.ready = false
    this.token = null
    this.name = null
    this.email = ''
    this.userId = null
    this.avatar = null
    this.storageName = 'userData'
  }

  login (jwtToken, id) {
    this.token = jwtToken
    this.userId = id
    this.isAuthenticated = true
    this.isRegistered = false

    localStorage.setItem(this.storageName, JSON.stringify({
      userId: id, token: jwtToken
    }))
  }

  register () {
    this.isRegistered = true
  }

  logout () {
    this.isAuthenticated = false
    this.isRegistered = false
    this.ready = false
    this.token = null
    this.name = null
    this.email = ''
    this.userId = null
    this.avatar = null
    localStorage.removeItem(this.storageName)
  }

  checkUser () {
    const data = JSON.parse(localStorage.getItem(this.storageName))

    if (data && data.token) {
      this.login(data.token, data.userId)
    }
    this.ready = true
  }
}

decorate(User, {
  login: action,
  checkUser: action,
  register: action,
  logout: action,
  isAuthenticated: observable,
  isRegistered: observable,
  token: observable,
  name: observable,
  email: observable,
  avatar: observable,
  userId: observable,
  ready: observable
})

export default new User()
