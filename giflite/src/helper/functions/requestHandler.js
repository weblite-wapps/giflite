import request from "superagent"

import config from "../../config"

export const getTrendGifs = () =>
  request
    .get(`${config.server}/trend`)
    .set("Access-Control-Allow-Origin", "*")
    .then(res => res.body)
    .then(res => {
      if (!res) throw "not res"
    })
    .catch(console.log)

export const getSearchGifs = info =>
  request
    .get(`${config.server}/search/${info}`)
    .set("Access-Control-Allow-Origin", "*")
    .then(res => res.body)
    .then(res => {
      if (!res) throw "not res"
    })
    .catch(console.log)

export const addToFav = info =>
  request
    .post(`${config.server}/addToFav`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.body)

export const getAllFavourites = userId =>
  request
    .get(`${config.server}/load/favs/all/${userId}`)
    .set("Access-Control-Allow-Origin", "*")
    .then(res => res.body)
    .then(res => {
      if (!res) throw "not res"
    })
    .catch(console.log)
