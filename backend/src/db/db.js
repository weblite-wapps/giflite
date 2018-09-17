const likeMongoose = require("mongoose")
const SentMongoose = require("mongoose")

const LikeSchema = likeMongoose.Schema
const SentSchema = SentMongoose.Schema

const blogSchema = new LikeSchema({
  userId: String,
  wisId: String,
  urlSmallSize: String,
  urlBigSize: String,
})

const BlogSchema = new SentSchema({
  wisId: String,
  urlBigSize: String,
})

exports.LikedGifliteMessages = likeMongoose.model(
  "giflite_liked_db",
  blogSchema,
)
exports.SentGifliteMessages = SentMongoose.model("giflite_sent_db", BlogSchema)
