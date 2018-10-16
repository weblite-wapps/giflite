export default (process.env.NODE_ENV === "development"
  ? {
      server: "https://git.heroku.com/giflite.git",
    }
  : {
      server: "https://git.heroku.com/giflite.git",
    })
