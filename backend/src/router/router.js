const express = require('express')
const R = require('ramda')
const bodyParser = require('body-parser')
const database = require('./../db/dbhandler')
const {
  reqToGiphyShowResTocli,
  getSingleGifUrlsFromGiphy,
  getSingleGifContentFromGiphy,
} = require('../helper/helperFunctions')

const router = express.Router()
router.use(bodyParser.json())

router.get('/search/:info', ({ params: { info } }, res) => {
  const giphyUrl = `http://api.giphy.com/v1/gifs/search?q=${info}&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`
  reqToGiphyShowResTocli(giphyUrl, res)
})

router.post('/addToFav', ({ body: { info } }, res) => {
  database
    .changeUserLikes(info)
    .then(() => res.send('added to Favourites'))
    .catch(console.log('we can not add to fav'))
})

router.post('/saveSentGif', ({ body: { info: { gifId, wisId } } }, res) => {
  database
    .saveSentGif(gifId, wisId)
    .then(() => res.send('saved in sent db'))
    .catch(console.log('we can not save in sent'))
})

router.get('/load/favs/all/:userId', ({ params: { userId } }, res) => {
  database
    .getAllLikedGifs(userId)
    .then(likedGifsInDB => {
      if (R.length(likedGifsInDB)) {
        const gifsIds = R.reverse(
          likedGifsInDB.map(gif => R.prop('gifId', gif)),
        )
        const giphyUrl = `http://api.giphy.com/v1/gifs?ids=${gifsIds}&api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`
        reqToGiphyShowResTocli(giphyUrl, res)
      }
    })
    .catch(console.log('cant load favs in db'))
})

router.get('/load/single/:gifId', ({ params: { gifId } }, res) => {
  const giphyUrl = `http://api.giphy.com/v1/gifs/${gifId}?api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz`
  getSingleGifUrlsFromGiphy(giphyUrl, res)
})

router.get('/trend', (req, res) => {
  const giphyUrl = `http://api.giphy.com/v1/gifs/trending?api_key=mX3Dx22ZGrswOXaCUw1tVVM23Jn3atiz&limit=25`
  reqToGiphyShowResTocli(giphyUrl, res)
})

router.get('/load/content', ({ query: { url } }, res) => {
  getSingleGifContentFromGiphy(url, res)
})

module.exports = router
