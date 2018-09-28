const mongoose = require("mongoose")

const Schema = mongoose.Schema

const likeSchema = new Schema({
  gifId: String,
  userId: String,
  wisId: String,
})

const sendSchema = new Schema({
  wisId: String,
  gifId: String,
})

exports.LikedGifliteMessages = mongoose.model("giflite_liked_dc", likeSchema)
exports.SentGifliteMessages = mongoose.model("giflite_sent_dc", sendSchema)
