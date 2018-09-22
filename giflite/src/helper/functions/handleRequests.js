import request from "superagent"

import config from "../../config"

export const getSearchRes = info =>
  request
    .post(`${config.server}/search`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.body)

export const addToFav = info =>
  request
    .post(`${config.server}/addToFav`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.body)

/// inja WisId va to app.vue userId hast
export const getAllFavourites = userId =>
  request
    .get(`${config.server}/load/favs/all/${userId}`)
    .set("Access-Control-Allow-Origin", "*")
    .then(res => res.body)
