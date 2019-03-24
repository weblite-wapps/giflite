const R = require('ramda')
const rp = require('request-promise')
const superagent = require('superagent')
const database = require('./../db/dbhandler')

exports.reqToGiphyShowResTocli = (url, res) =>
  rp(url)
    .then(async giphyResponse => {
      const paresdBodyData = R.compose(
        R.prop('data'),
        JSON.parse,
      )(giphyResponse)
      const gifs = await database.getSentGifsById(R.pluck('id', paresdBodyData))
      const wisIds = R.reduce(
        (acc, doc) => R.assoc(doc.gifId, doc.wisId, acc),
        {},
        gifs,
      )
      const urls = paresdBodyData.map(
        R.applySpec({
          gifId: R.prop('id'),
          smallUrl: R.path(['images', 'fixed_height_small', 'url']),
          smallImage: R.path(['images', 'fixed_height_small_still', 'url']),
          width: R.path(['images', 'fixed_height_small', 'width']),
          wisId: R.compose(
            R.prop(R.__, wisIds),
            R.prop('id'),
          ),
        }),
      )
      res.send(urls)
    })
    .catch(console.log('we can not receive data from giphy'))

exports.getSingleGifUrlsFromGiphy = (giphyUrl, res) => {
  rp(giphyUrl)
    .then(giphyResponse => {
      const parsedBody = JSON.parse(giphyResponse)
      const paresdBodyData = R.prop('data', parsedBody)
      const urls = {
        bigUrl: paresdBodyData.images.fixed_height.url,
        bigImage: paresdBodyData.images.fixed_height_still.url,
        width: paresdBodyData.images.fixed_height.width,
        height: paresdBodyData.images.fixed_height.height,
      }
      res.send(urls)
    })
    .catch(console.log('we can not load single url '))
}

exports.getSingleGifContentFromGiphy = (url, res) =>
  superagent
    .get(url)
    .then(gres => {
      res.send(gres.body)
    })
    .catch(console.log('we can not load single content'))
