export default (process.env.NODE_ENV === 'development'
  ? {
      // server: 'https://giflite.herokuapp.com',
      server: 'http://localhost:3095',
    }
  : {
      server: 'http://localhost:3095',
    })
