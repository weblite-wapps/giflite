import request from 'superagent'

import config from '../../config'

const filter = res => {
  if (res) return res
  throw 'not res'
}

const logger = console.log

export const getTrendGifs = offset =>
  request
    .get(`${config.server}/trend`)
    .query({ offset })
    .set('Access-Control-Allow-Origin', '*')
    .then(res => res.body)
    .then(filter)
    .catch(logger)

export const getSearchGifs = (info, offset) =>
  request
    .get(`${config.server}/search/${info}`)
    .query({ offset })
    .set('Access-Control-Allow-Origin', '*')
    .then(res => res.body)
    .then(filter)
    .catch(logger)

export const changeLikes = info =>
  request
    .post(`${config.server}/changeLike`)
    .set('Access-Control-Allow-Origin', '*')
    .send({ info })
    .then(res => res.body)
    .catch(logger)

export const getAllFavourites = userId =>
  request
    .get(`${config.server}/load/favs/all/${userId}`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => res.body)
    .then(filter)
    .catch(logger)
