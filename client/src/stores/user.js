import { action, configure, decorate, observable } from 'mobx'

configure({ enforceActions: 'observed' })

class User {
  constructor () {
    this.isAuthenticated = false
    this.ready = false
    this.name = null
    this.email = null
    this.userId = null
    this.avatar = null
    this.storageName = 'userData'
  }

  setUser ({userId, token, avatar, name, email}) {
    this.isAuthenticated = true
    this.name = name
    this.email = email
    this.userId = userId
    this.avatar = avatar

    localStorage.setItem(this.storageName, JSON.stringify({
      userId: userId, token: token, avatar: avatar, name: name, email: email
    }))
  }

  facebookLogin ({ avatar, name, email, accessToken, userId }) {
    this.isAuthenticated = true
    this.name = name
    this.email = email
    this.userId = userId
    this.avatar = avatar

    localStorage.setItem(this.storageName, JSON.stringify({
      avatar: avatar, name: name, email: email, userId: userId, token: accessToken
    }))
  }

  logout () {
    this.isAuthenticated = false
    this.ready = false
    this.name = null
    this.email = null
    this.userId = null
    this.avatar = null
    localStorage.removeItem(this.storageName)
  }

  checkUser () {
    const data = JSON.parse(localStorage.getItem(this.storageName))

    if (data && data.token) {
      this.setUser({
        userId: data.userId, token: data.token, avatar: data.avatar, name: data.name, email: data.email
      })

    }
    this.ready = true
  }
}

decorate(User, {
  setUser: action,
  facebookLogin: action,
  checkUser: action,
  logout: action,
  isAuthenticated: observable,
  name: observable,
  email: observable,
  avatar: observable,
  userId: observable,
  ready: observable
})

export default new User()
