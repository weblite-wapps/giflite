const mongoose = require('mongoose')

const { Schema } = mongoose

const likeSchema = new Schema({
  gifId: String,
  userId: String,
  wisId: String,
})

const sendSchema = new Schema({
  wisId: String,
  gifId: String,
})

exports.LikedGifliteMessages = mongoose.model('bookmarks', likeSchema)
exports.SentGifliteMessages = mongoose.model('sents', sendSchema)
