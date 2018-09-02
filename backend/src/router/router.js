const express = require("express")

const router = express.Router()

router.post("/search", (req, res) => {
  console.log("hello3")
  router.get("www.api.giphy.com/v1/gifs/search", (request, response) => {
    console.log("response: ", response)
    response.send(res)
  })
  //   console.log("req.body: ", req.body.info)
  //   res.send({ title: req.body.info })
})

module.exports = router
