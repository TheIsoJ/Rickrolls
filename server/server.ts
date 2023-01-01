import dotenv from "dotenv"
dotenv.config()

import http from "http"
import app from "./index.js"

const port = process.env.PORT

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Servu pyörii nyt portissa ${port}.\nAPI on nyt käytettävissä.`)
})