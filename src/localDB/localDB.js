let generateRandomId = () => `_${Math.random().toString(36).substr(2, 9)}_`

export default {
  name: 'Local User DB',
  userField: 'User',
  createUserProfile () {
    let id = generateRandomId()
    let user = {
      SearchTermsDB: `Search${id}DB`,
      FavoriteDB: `Favorites${id}DB`
    }

    localStorage.setItem('User', JSON.stringify(user))
    localStorage.setItem(user.SearchTermsDB, '')
    localStorage.setItem(user.FavoriteDB, '')

    return user
  },
  getValue (key) {
    let value = localStorage.getItem(key)
    return value ? JSON.parse(value) : value
  },
  setValue (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
