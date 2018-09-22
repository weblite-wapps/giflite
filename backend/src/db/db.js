const likeMongoose = require("mongoose")
const SentMongoose = require("mongoose")

const LikeSchema = likeMongoose.Schema
const SentSchema = SentMongoose.Schema

const blogSchema = new LikeSchema({
  gifId: String,
  userId: String,
  wisId: String,
})

const BlogSchema = new SentSchema({
  wisId: String,
  gifId: String,
})

exports.LikedGifliteMessages = likeMongoose.model(
  "giflite_liked_db",
  blogSchema,
)
exports.SentGifliteMessages = SentMongoose.model("giflite_sent_db", BlogSchema)
