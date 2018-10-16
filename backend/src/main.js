const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const router = require("./router/router.js")
const Database = require("./db/dbhandler")

const app = express()

app.use(cors({ origin: "*" }))
Database.connect("giflite_db")
app.use(bodyParser.json())
app.use("/", router)
app.listen(process.env.PORT || 3095)
