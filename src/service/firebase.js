
import firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyD7xFjyqWdQ9i7BbYmPzgMKdZIt-Xdudkw',
  authDomain: 'imsearch-app.firebaseapp.com',
  databaseURL: 'https://imsearch-app.firebaseio.com',
  projectId: 'imsearch-app',
  storageBucket: 'imsearch-app.appspot.com',
  messagingSenderId: '505093691213'
}

firebase.initializeApp(config)

export default {
  database: firebase.database()
}
