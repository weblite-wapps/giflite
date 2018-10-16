export default (process.env.NODE_ENV === "development"
  ? {
      server: "https://giflite.herokuapp.com",
    }
  : {
      server: "https://giflite.herokuapp.com",
    })
