import request from "superagent"

import config from "../config"

export const getSingleGifData = wisId =>
  //  {
  //   console.log("urlSmallSize: ", urlSmallSize)
  // }
  request
    .get(`${config.server}/load/single/${wisId}`)
    .set("Access-Control-Allow-Origin", "*")
    .then(res => res.body)

export const addToFav = info =>
  request
    .post(`${config.server}/addToFav`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.body)

// export const getAllFavourites = wisId =>
//   request
//     .get(`${config.server}/load/all/${wisId}`)
//     .set("Access-Control-Allow-Origin", "*")
//     .then(res => res.body)
