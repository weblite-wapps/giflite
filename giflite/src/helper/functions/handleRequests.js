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
    .send({ ...info })
    .then(res => res.body)
