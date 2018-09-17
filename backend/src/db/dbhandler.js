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
    console.log(`connected to  database ${name} `)
  })
}

exports.addGif = (wisId, userId, urlSmallSize, urlBigSize) =>
  new models.LikedGifliteMessages({
    userId,
    wisId,
    urlSmallSize,
    urlBigSize,
  }).save()

exports.getAllGifs = userId =>
  models.LikedGifliteMessages.find({ userId }).exec()

exports.getSingleGif = wisId =>
  models.LikedGifliteMessages.find({ wisId }).exec()

exports.updategif = (wisid, userid, urlsmall, urlbig) => {
  const query = { userId: userid, urlSmallSize: urlsmall, urlBigSize: urlbig }
  models.LikedGifliteMessages.findOneAndUpdate(
    query,
    { wisId: wisid },
    { upsert: true },
  ).exec()
}
