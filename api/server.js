const express = require("express")
const server = express()

const apiRouter = require("./apiRouter.js")
const configMiddleware = require("./configMiddleware.js")

configMiddleware(server)

server.get("/", (req, res)=> {
    res.send(`<h1>Your server is up an running</h1>`)
})

server.use("/api", apiRouter)

module.exports = server