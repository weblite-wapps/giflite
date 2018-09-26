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

// exports.addGif = (wisId, userId, urlSmallSize, urlBigSize) =>
//   new models.LikedGifliteMessages({
//     userId,
//     wisId,
//     urlSmallSize,
//     urlBigSize,
//   }).save()

exports.getAllLikedGifs = userId =>
  models.LikedGifliteMessages.find({ userId }).exec()

exports.getSingleGif = wisId =>
  models.LikedGifliteMessages.find({ wisId }).exec()

exports.updateLikedGif = (gifId, userId, wisId) =>
  models.LikedGifliteMessages.findOneAndUpdate(
    { gifId, userId },
    { wisId },
    { upsert: true },
  ).exec()

exports.updateSentGif = (gifId, wisId) =>
  models.SentGifliteMessages.find({ gifId }, (err, docs) => {
    // console.log("docs ", docs)

    if (docs.length) {
      console.log("gif has already been saved in sent Db")
    } else {
      new models.SentGifliteMessages({
        gifId,
        wisId,
      }).save()
    }
  })
