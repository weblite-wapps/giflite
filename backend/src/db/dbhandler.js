const mongoose = require("mongoose")
const models = require("./db")

exports.connect = name => {
  mongoose.connect(
    `mongodb://localhost/${name}`,
    { useNewUrlParser: true },
  )
  const db = mongoose.connection
  db.on("error", console.log)
  db.once("open", () => {
    console.log("connected to giflite database ")
  })
}

exports.addGif = (userId, wisId, urlSmallSize, urlBigSize) =>
  new models.Giflite({ userId, wisId, urlSmallSize, urlBigSize }).save()
