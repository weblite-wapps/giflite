const express = require("express")
const request = require("request")
const R = require("ramda")
const bodyParser = require("body-parser")
const rp = require("request-promise")
const database = require("./../db/dbhandler")

const router = express.Router()

router.use(bodyParser.json())
router.get("/search/:info", ({ params: { info } }, res) => {
  const options = {
    uri: `http://api.giphy.com/v1/gifs/search?q=${info}&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
  }
  rp(options)
    .then(repos => {
      const parsedBody = JSON.parse(repos)
      const paresdBodyData = R.prop("data", parsedBody)
      const urls = paresdBodyData.map(
        R.applySpec({
          gifId: R.path(["id"]),
          smallUrl: R.path(["images", "fixed_height_small", "url"]),
          smallImage: R.path(["images", "fixed_height_small_still", "url"]),
          width: R.path(["images", "fixed_height_small", "width"]),
        }),
      )
      res.send(urls)
    })
    .catch(console.log)
})

router.post("/addToFav", (req, res) => {
  database
    .updateLikedGif(
      req.body.info.gifId,
      req.body.info.userId,
      req.body.info.wisId,
    )
    .then(() => res.send("added to Favourites"))
    .catch(console.log)
})

router.get("/load/favs/all/:userId", ({ params: { userId } }, res) => {
  database.getAllLikedGifs(userId).then(response => {
    const r = response
    const Ids = response.map(x => x.gifId)
    const options = {
      uri: `http://api.giphy.com/v1/gifs?ids=${Ids}&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
    }
    if (Ids) {
      rp(options)
        .then(repos => {
          const parsedBody = JSON.parse(repos)
          const paresdBodyData = R.prop("data", parsedBody)
          const urls = paresdBodyData.map(
            R.applySpec({
              gifId: R.path(["id"]),
              smallUrl: R.path(["images", "fixed_height_small", "url"]),
              bigUrl: R.path(["images", "fixed_height", "url"]),
              smallImage: R.path(["images", "fixed_height_small_still", "url"]),
              width: R.path(["images", "fixed_height_small", "width"]),
              userId: R.always(userId),
              wisId: gifObj =>
                R.find(R.propEq("gifId", R.path(["id"], gifObj)))(r).wisId,
            }),
          )
          res.send(urls)
        })
        .catch(console.log, () => {
          res.send([])
        })
    } else {
      res.send([])
    }
  })
})

router.get("/load/single/:gifId", ({ params: { gifId } }, res) => {
  const options = {
    uri: `http://api.giphy.com/v1/gifs/${gifId}?api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
  }
  rp(options)
    .then(repos => {
      const parsedBody = JSON.parse(repos)
      const paresdBodyData = R.prop("data", parsedBody)
      const urls = {}
      urls.bigUrl = paresdBodyData.images.fixed_height.url
      urls.bigImage = paresdBodyData.images.fixed_height_still.url
      urls.width = paresdBodyData.images.fixed_height.width
      urls.height = paresdBodyData.images.fixed_height.height
      console.log("single urls ", urls)
      res.send(urls)
    })
    .catch(console.log)
})

router.post("/SaveSentGif", ({ body: { info } }, res) => {
  database
    .updateSentGif(info.gifId, info.wisId)
    .then(() => res.send("saved in sent db"))
    .catch(console.log)
})

router.get("/trend", (req, res) => {
  const options = {
    uri: `http://api.giphy.com/v1/gifs/trending?api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
  }
  rp(options)
    .then(repos => {
      const parsedBody = JSON.parse(repos)
      const paresdBodyData = R.prop("data", parsedBody)
      const urls = paresdBodyData.map(
        R.applySpec({
          gifId: R.path(["id"]),
          smallUrl: R.path(["images", "fixed_height_small", "url"]),
          smallImage: R.path(["images", "fixed_height_small_still", "url"]),
          width: R.path(["images", "fixed_height_small", "width"]),
        }),
      )
      res.send(urls)
    })
    .catch(console.log)
})

module.exports = router
