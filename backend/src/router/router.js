const express = require("express")
const request = require("request")
const R = require("ramda")
const bodyParser = require("body-parser")

const router = express.Router()

router.use(bodyParser.json())

router.post("/search", (req, res) => {
  console.log("hello", req.body.info)
  request(
    `http://api.giphy.com/v1/gifs/search?q=${
      req.body.info
    }&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
    (error, response, body) => {
      const parsedBody = JSON.parse(body)
      // console.log(parsedBody.data) // Print the error if one occurred
      // console.log("statusCode:", response && response.statusCode) // Print the response status code if a response was received
      // console.log("parsedBody: ", parsedBody)
      const paresdBodyData = R.prop("data", parsedBody)
      // console.log("paresdBodyData: ", paresdBodyData)
      const urls = paresdBodyData.map(x =>
        R.path(["images", "fixed_width", "url"], x),
      )
      // console.log(urls.length)
      console.log(urls)
      // console.log(typeof urls)

      // .map(x, R.prop("url",R.prop("downsized", R.prop("images", x)),))
      res.send(urls)
    },
  )

  //   console.log("req.body: ", req.body.info)
  //   res.send({ title: req.body.info })
})

module.exports = router
