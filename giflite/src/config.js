export default (process.env.NODE_ENV === "development"
  ? {
    server: 'http://localhost:3095',
  }
  : {
    // server: "https://wapp.weblite.me/giflite"
    server: "https://giflite.herokuapp.com"
  });
