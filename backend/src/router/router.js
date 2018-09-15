const express = require("express")
const request = require("request")
const R = require("ramda")
const bodyParser = require("body-parser")
const database = require("./../db/dbhandler")

const router = express.Router()

router.use(bodyParser.json())
router.post("/search", (req, res) => {
  // console.log("hello", req.body.info)
  // console.log("hello", typeof req.body.info)
  // console.log("hello", req.body.info.length)
  request(
    `http://api.giphy.com/v1/gifs/search?q=${
      req.body.info
    }&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz&limit=5`,
    (error, response, body) => {
      const parsedBody = JSON.parse(body)
      // console.log(parsedBody.data) // Print the error if one occurred
      // console.log("statusCode:", response && response.statusCode) // Print the response status code if a response was received
      // console.log("parsedBody: ", parsedBody)
      const paresdBodyData = R.prop("data", parsedBody)
      // console.log("paresdBodyData: ", paresdBodyData)
      const smallSizeUrls = paresdBodyData.map(x =>
        R.path(["images", "fixed_width_small", "url"], x),
      )
      const bigSizeUrls = paresdBodyData.map(x =>
        R.path(["images", "fixed_height", "url"], x),
      )
      const urls = R.zip(smallSizeUrls, bigSizeUrls)
      // console.log("salam: ", urls.length)
      // console.log("urls: ", urls)
      // console.log("salam: ", typeof urls)
      // .map(x, R.prop("url",R.prop("downsized", R.prop("images", x)),))
      res.send(urls)
    },
  )
  //   console.log("req.body: ", req.body.info)
  //   res.send({ title: req.body.info })
})

router.post("/addToFav", (req, res) => {
  // console.log("req.body: ", req.body)
  // console.log("req.body.info: ", req.body.info)
  // console.log("req: ", req.body.info[1])
  // console.log("req: ", req.body.info[2])
  // console.log("req: ", req.body.info.url[1])
  // console.log("req: ", req.body.info.url[2])
  // console.log("req: ", req.body.info.url[3])

  database.updategif(
    req.body.info[3],
    req.body.info[2],
    req.body.info[0],
    req.body.info[1],
  )
  // .addGif(
  //   req.body.info.url[0],
  //   req.body.info.url[1],
  //   req.body.info.url[2],
  //   req.body.info.wisId,
  // )
  // .then(console.log("added to db"))
  // .catch(console.log)
})

router.get("/load/all/:userId", ({ params: { userId } }, res) => {
  console.log("getAllFavs userId", userId)
  // console.log("req.params: ", wisId)
  database
    .getAllGifs(userId)
    .then(response => res.send(response))
    .catch(console.log)
})

router.get("/load/single/:wisId", ({ params: { wisId } }, res) => {
  // console.log("load single file")
  // console.log("req.params: ", userId)
  database
    .getSingleGif(wisId)
    .then(response => res.send(response))
    .catch(console.log)
})

module.exports = router
