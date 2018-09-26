import request from "superagent"

import config from "../config"

export const getSingleGifData = gifId =>
  request
    .get(`${config.server}/load/single/${gifId}`)
    .set("Access-Control-Allow-Origin", "*")
    .then(res => res.body)

export const addToFav = info =>
  request
    .post(`${config.server}/addToFav`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.body)

export const SaveToDb = info =>
  request
    .post(`${config.server}/SaveSentGif`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.text)
