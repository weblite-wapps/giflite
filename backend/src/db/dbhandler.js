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

exports.addGif = (urlSmallSize, urlBigSize, userId, wisId) =>
  new models.Giflite({
    userId,
    wisId,
    urlSmallSize,
    urlBigSize,
  }).save()

exports.getAllGifs = userId => models.Giflite.find({ userId }).exec()

exports.getSingleGif = wisId => models.Giflite.find({ wisId }).exec()

exports.updategif = (wisid, userid, urlsmall, urlbig) => {
  const query = { userId: userid, urlSmallSize: urlsmall, urlBigSize: urlbig }
  models.Giflite.findOneAndUpdate(
    query,
    { wisId: wisid },
    { upsert: true },
  ).exec()
}
