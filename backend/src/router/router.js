const express = require("express")
const request = require("request")
const R = require("ramda")
const bodyParser = require("body-parser")
const database = require("./../db/dbhandler")

const router = express.Router()

router.use(bodyParser.json())
router.post("/search", (req, res) => {
  console.log("hello", req.body.info)
  console.log("hello", typeof req.body.info)
  // console.log("hello", req.body.info.length)
  request(
    `http://api.giphy.com/v1/gifs/search?q=${
      req.body.info
    }&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz&limit=20`,
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
      console.log("salam: ", urls.length)
      console.log("salam: ", urls)
      console.log("salam: ", typeof urls)
      // .map(x, R.prop("url",R.prop("downsized", R.prop("images", x)),))
      res.send(urls)
    },
  )
  //   console.log("req.body: ", req.body.info)
  //   res.send({ title: req.body.info })
})

router.post("/addToFav", (req, res) => {
  console.log("req: ", req.body)
  database
    .addGif(req.body.userId, req.body.wisId, req.body.info[0], req.body.info[1])
    .then(console.log("added to db"))
    .catch(console.log)
})

module.exports = router
