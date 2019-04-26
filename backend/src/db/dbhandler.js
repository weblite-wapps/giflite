const mongoose = require('mongoose')
const models = require('./db')

exports.connect = name => {
  const uri = `mongodb://localhost:27017/${name}`
  // const uri = `mongodb://javadVhd_2256:javad2256atlas#@cluster0-shard-00-00-mmpzu.mongodb.net:27017,cluster0-shard-00-01-mmpzu.mongodb.net:27017,cluster0-shard-00-02-mmpzu.mongodb.net:27017/${name}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
  mongoose.connect(
    uri,
    { useNewUrlParser: true },
  )
}
mongoose.connection.on('connected', () => {
  console.log('connection established !')
})
mongoose.connection.on('error', console.log)

exports.getAllLikedGifs = userId => models.LikedGifliteMessages.find({ userId })

exports.getSentGifsById = gifIds =>
  models.SentGifliteMessages.find({ gifId: { $in: gifIds } })

exports.changeUserLikes = ({ gifId, userId, wisId, action }) => {
  if (action === 'like') {
    return models.LikedGifliteMessages.findOneAndUpdate(
      { userId, gifId },
      { wisId },
      {
        upsert: true,
      },
    )
  }
  return models.LikedGifliteMessages.findOneAndDelete({ userId, gifId })
}

exports.saveSentGif = (gifId, wisId) =>
  models.SentGifliteMessages.find({ gifId }).then(docs => {
    if (!docs.length) {
      new models.SentGifliteMessages({
        gifId,
        wisId,
      }).save()
    }
  })
