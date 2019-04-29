export default (process.env.NODE_ENV === 'development'
  ? {
    server: 'http://localhost:4180',
  }
  : {
    server: 'https://wapp.weblite.me/giflite',
  })
