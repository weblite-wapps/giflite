// import no-extraneous-dependecies
const express = require("express")
const https = require("https")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const fs = require("fs")
const router = require("./router/router.js")
const likeDatabase = require("./db/dbhandler")
const sentDatabase = require("./db/dbhandler")

const app = express()

app.use(cors({ origin: "*" }))
likeDatabase.connect("giflite_liked_db")
sentDatabase.connect("giflite_sent_db")
app.use(bodyParser.json())
app.use("/", router)

const key = fs.readFileSync(path.resolve("./src/certs/express.key"), "utf8")
const cert = fs.readFileSync(path.resolve("./src/certs/express.crt"), "utf8")

https.createServer({ key, cert }, app).listen(3095)
