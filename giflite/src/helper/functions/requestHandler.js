import request from 'superagent'

import config from '../../config'

const filter = res => {
  if (res) return res
  throw 'not res'
}

export const getTrendGifs = () =>
  request
    .get(`${config.server}/trend`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => res.body)
    .then(filter)
    .catch(console.log)

export const getSearchGifs = info =>
  request
    .get(`${config.server}/search/${info}`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => res.body)
    .then(filter)
    .catch(console.log)

export const changeLikes = info =>
  request
    .post(`${config.server}/addToFav`)
    .set('Access-Control-Allow-Origin', '*')
    .send({ info })
    .then(res => res.body)
    .catch(console.log)

export const getAllFavourites = userId =>
  request
    .get(`${config.server}/load/favs/all/${userId}`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => res.body)
    .then(filter)
    .catch(console.log)
