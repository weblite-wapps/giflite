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

exports.getAllLikedGifs = userId => models.LikedGifliteMessages.find({ userId })

exports.getSingleGif = wisId => models.LikedGifliteMessages.find({ wisId })

exports.updateLikedGif = (gifId, userId, wisId) =>
  models.LikedGifliteMessages.findOneAndUpdate(
    { gifId, userId },
    { wisId },
    { upsert: true },
  ).exec()

exports.updateSentGif = (gifId, wisId) =>
  models.SentGifliteMessages.find({ gifId }).then(docs => {
    // console.log("docs ", docs.length)
    if (!docs.length) {
      new models.SentGifliteMessages({
        gifId,
        wisId,
      }).save()
    }
  })
