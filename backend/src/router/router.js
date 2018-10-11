const express = require("express")
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
    .then(giphyResponse => {
      const parsedBody = JSON.parse(giphyResponse)
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
    .catch(console.log("we can not search"))
})

router.post("/addToFav", ({ body: { info } }, res) => {
  database
    .updateLikedGifAfterLike(info.gifId, info.userId, info.wisId)
    .then(() => res.send("added to Favourites"))
    .catch(console.log("we can not add to fav"))
})

router.post("/saveSentGif", ({ body: { info: { gifId, wisId } } }, res) => {
  database
    .saveSentGif(gifId, wisId)
    .then(() => res.send("saved in sent db"))
    .catch(console.log("we can not saved in sent"))
  database
    .updateLikedGifAfterSent(gifId, wisId)
    .catch(console.log("we can not updateLikedGifAfterSent"))
})

router.get("/load/favs/all/:userId", ({ params: { userId } }, res) => {
  database.getAllLikedGifs(userId).then(LikedgifsInDb => {
    const Ids = LikedgifsInDb.map(gif => R.prop("gifId", gif))
    const options = {
      uri: `http://api.giphy.com/v1/gifs?ids=${Ids}&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
    }
    rp(options)
      .then(giphyResponse => {
        const parsedBody = JSON.parse(giphyResponse)
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
              R.find(R.propEq("gifId", R.path(["id"], gifObj)))(LikedgifsInDb)
                .wisId,
          }),
        )
        res.send(urls)
      })
      .catch(error => {
        console.log("we can not load fav 2")
        res.send([])
      })
  })
})

router.get("/load/single/:gifId", ({ params: { gifId } }, res) => {
  const options = {
    uri: `http://api.giphy.com/v1/gifs/${gifId}?api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
  }

  rp(options)
    .then(giphyResponse => {
      const parsedBody = JSON.parse(giphyResponse)
      const paresdBodyData = R.prop("data", parsedBody)
      const urls = {
        bigUrl: paresdBodyData.images.fixed_height.url,
        bigImage: paresdBodyData.images.fixed_height_still.url,
        width: paresdBodyData.images.fixed_height.width,
        height: paresdBodyData.images.fixed_height.height,
      }
      res.send(urls)
    })
    .catch(console.log("we can not load single"))
})

router.get("/trend", (req, res) => {
  const options = {
    uri: `http://api.giphy.com/v1/gifs/trending?api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
  }
  rp(options)
    .then(giphyResponse => {
      const parsedBody = JSON.parse(giphyResponse)
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
    .catch(console.log("we can not load trend"))
})

module.exports = router
