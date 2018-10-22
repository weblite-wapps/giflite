export default (process.env.NODE_ENV === 'development'
  ? {
      server: 'http://localhost:3095',
    }
  : {
      server: 'https://giflite.herokuapp.com',
    })
