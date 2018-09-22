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

exports.getAllLikedGifs = userId =>
  models.LikedGifliteMessages.find({ userId }).exec()

exports.getSingleGif = wisId =>
  models.LikedGifliteMessages.find({ wisId }).exec()

exports.updateLikedGif = (gifid, userid, wisid) => {
  const query = {
    gifId: gifid,
    userId: userid,
  }
  models.LikedGifliteMessages.findOneAndUpdate(
    query,
    { wisId: wisid },
    { upsert: true },
  ).exec()
}

exports.updateSentGif = async (gifId, wisId) => {
  const res = await models.SentGifliteMessages.find({ gifId })
  return res
  // console.log("mod ", mod)

  // const query = {
  //   gifId,
  // }
  // models.SentGifliteMessages.findOneAndUpdate(
  //   query,
  //   { wisId },
  //   { upsert: true },
  // ).exec()
}

// exports.addSentGif = {Big}
