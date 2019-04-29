export default (process.env.NODE_ENV === 'development'
  ? {
    server: 'https://giflite.herokuapp.com',
    // server: 'http://localhost:4180',
  }
  : {
    server: 'https://wapp.weblite.me/giflite',
    // server: 'https://giflite.herokuapp.com',
  })
