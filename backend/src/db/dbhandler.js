const mongoose = require("mongoose")
const models = require("./db")

exports.connect = name => {
  const uri = `mongodb://javadVhd_2256:javad2256atlas#@cluster0-shard-00-00-mmpzu.mongodb.net:27017,cluster0-shard-00-01-mmpzu.mongodb.net:27017,cluster0-shard-00-02-mmpzu.mongodb.net:27017/${name}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
  const connection = mongoose.connect(
    uri,
    { useNewUrlParser: true },
  )
}
mongoose.connection.on("connected", () => {
  console.log("connection established!!!")
})
mongoose.connection.on("error", console.log)

exports.getAllLikedGifs = userId => models.LikedGifliteMessages.find({ userId })

exports.getSingleSentGif = gifId => models.SentGifliteMessages.find({ gifId })

exports.updateLikedGifAfterLike = (gifId, userId, wisId) =>
  models.LikedGifliteMessages.findOneAndUpdate(
    { gifId, userId },
    { wisId },
    { upsert: true },
  ).exec()

exports.updateLikedGifAfterSent = (gifId, wisId) =>
  models.LikedGifliteMessages.findOneAndUpdate({ gifId }, { wisId }).exec()

exports.saveSentGif = (gifId, wisId) =>
  models.SentGifliteMessages.find({ gifId }).then(docs => {
    if (!docs.length) {
      new models.SentGifliteMessages({
        gifId,
        wisId,
      }).save()
    }
  })
