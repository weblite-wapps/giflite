const mongoose = require("mongoose")

const Schema = mongoose.Schema

const blogSchema = new Schema({
  userId: String,
  wisId: String,
  urlSmallSize: String,
  urlBigSize: String,
})

exports.Giflite = mongoose.model("giflite_db", blogSchema)
