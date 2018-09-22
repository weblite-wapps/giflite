const express = require("express")
const request = require("request")
const R = require("ramda")
const bodyParser = require("body-parser")
const database = require("./../db/dbhandler")

// const getUrl = info => {
//   console.log("1111 is added ", info)
// }

const router = express.Router()

router.use(bodyParser.json())
router.post("/search", (req, res) => {
  console.log("hello", req.body.info)
  // console.log("hello", typeof req.body.info)
  // console.log("hello", req.body.info.length)
  request(
    `http://api.giphy.com/v1/gifs/search?q=${
      req.body.info
    }&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz&limit=5`,
    (error, response, body) => {
      const parsedBody = JSON.parse(body)
      const paresdBodyData = R.prop("data", parsedBody)
      // console.log("paresdBodyData: ", paresdBodyData[0])
      const urls = paresdBodyData.map(
        R.applySpec({
          gifId: R.path(["id"]),
          smallUrl: R.path(["images", "fixed_height_small", "url"]),
          // bigUrl: R.path(["images", "fixed_height", "url"]),
          smallImage: R.path(["images", "fixed_height_small_still", "url"]),
          width: R.path(["images", "fixed_height_small", "width"]),
        }),
      )

      // const widths = paresdBodyData.map(x =>
      //   R.path(["images", "fixed_height_small", "width"], x),
      // )
      // console.log("widths ", widths)

      // const bigSizeUrls = paresdBodyData.map(x =>
      //   R.path(["images", "fixed_height", "url"], x),
      // )
      // const urls = R.zip(smallSizeUrls, bigSizeUrls)
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
  // console.log("req.body.info: ", req.body)
  console.log("req.body.info: ", req.body.info.gifId)
  // console.log("req: ", req.body.info[1])
  // console.log("req: ", req.body.info[2])
  // console.log("req: ", req.body.info.url[1])
  // console.log("req: ", req.body.info.url[2])
  // console.log("req: ", req.body.info.url[3])

  // (smallurl, bigurl, imageurl, wisid, userid, width
  database.updateLikedGif(
    req.body.info.gifId,
    req.body.info.userId,
    req.body.info.wisId,
  )
  // .then(console.log("added to liked db"))
  // ////////////////////////////
  // .then(console.log("added to liked db"))
  // .catch(console.log)
  // chera hamash be in then Error mide ??
  // ////////////////////////////

  // .addGif(
  // )
  // .then(console.log("added to db"))
  // .catch(console.log)
})

router.get("/load/favs/all/:userId", ({ params: { userId } }, res) => {
  // console.log("getAllFavs userId", userId)
  // console.log("req: ", req)
  database
    .getAllLikedGifs(userId)
    .then(response => {
      const r = response
      console.log("response ", response)
      const Ids = response.map(x => x.gifId)
      console.log("Ids ", Ids)

      request(
        `http://api.giphy.com/v1/gifs?ids=${Ids}&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
        (error, response, body) => {
          const parsedBody = JSON.parse(body)
          // console.log("parsedBody: ", parsedBody)
          const paresdBodyData = R.prop("data", parsedBody)
          // console.log("paresdBodyData: ", paresdBodyData)
          const urls = paresdBodyData.map(
            R.applySpec({
              gifId: R.path(["id"]),
              smallUrl: R.path(["images", "fixed_height_small", "url"]),
              bigUrl: R.path(["images", "fixed_height", "url"]),
              smallImage: R.path(["images", "fixed_height_small_still", "url"]),
              width: R.path(["images", "fixed_height_small", "width"]),
              wisId: gifObj =>
                R.find(R.propEq("gifId", R.path(["id"], gifObj)))(r).wisId,
            }),
          )
          console.log("urls ", urls)
          res.send(urls)
        },
      )
    })
    .catch(console.log)
})

router.get("/load/single/:gifId", ({ params: { gifId } }, res) => {
  // console.log("load single file")
  // console.log("req.params: ", gifId)

  request(
    `http://api.giphy.com/v1/gifs/${gifId}?api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`,
    (error, response, body) => {
      const parsedBody = JSON.parse(body)
      // console.log("parsedBody: ", parsedBody)
      const paresdBodyData = R.prop("data", parsedBody)
      // console.log("paresdBodyData: ", paresdBodyData)
      const urls = {}
      // urls.gifId = paresdBodyData.id
      urls.bigUrl = paresdBodyData.images.fixed_height.url
      urls.bigImage = paresdBodyData.images.fixed_height_still.url

      // const urls = R.applySpec({
      //   gifId: R.path(["id"], paresdBodyData),
      //   bigUrl: R.path(["images", "fixed_height", "url"], paresdBodyData),
      //   bigImage: R.path(
      //     ["images", "fixed_height_still", "url"],
      //     paresdBodyData,
      //   ),
      // })
      // maximum call stack size exceed
      // console.log("urls", urls.bigUrl)
      res.send(urls)
    },
  )
  // database
  //   .getSingleGif(gifId)
  //   .then(response => res.send(response))
  //   .catch(console.log)
})

router.post("/SaveSentGif", ({ body: { info } }, res) => {
  // console.log("req.body ", info)

  database.updateSentGif(info.gifId, info.wisId).then(console.log)
  // .then(response => res.send(response))
  // .catch(console.log)
})

module.exports = router
