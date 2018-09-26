const mongoose = require("mongoose")

const Schema = mongoose.Schema

const blogSchema = new Schema({
  gifId: String,
  userId: String,
  wisId: String,
})

const BlogSchema = new Schema({
  wisId: String,
  gifId: String,
})

exports.LikedGifliteMessages = mongoose.model("giflite_liked_db", blogSchema)
exports.SentGifliteMessages = mongoose.model("giflite_sent_db", BlogSchema)
