import request from "superagent";

import config from "../config";

const filter = res => {
  if (res) return res;
  throw "no res";
};

const logger = console.log;

export const getSingleGifData = gifId =>
  request
    .get(`${config.server}/load/single/${gifId}`)
    .set("Access-Control-Allow-Origin", "*")
    .then(res => res.body)
    .then(filter)
    .catch(logger);

export const addToFav = info =>
  request
    .post(`${config.server}/addToFav`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.body);

export const saveToDb = info =>
  request
    .post(`${config.server}/saveSentGif`)
    .set("Access-Control-Allow-Origin", "*")
    .send({ info })
    .then(res => res.text);
