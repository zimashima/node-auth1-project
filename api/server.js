const express = require("express")
const server = express()

const session = require("express-session")
const dbConnection = require("../data/dbConfig")
const apiRouter = require("./apiRouter.js")
const configMiddleware = require("../middleware/configMiddleware.js")

const KnexSessionStore = require("connect-session-knex")(session)


server.use(session({
    name: `chocolatechip`,
    resave: false,
    saveUninitialized: false,
    secret: "secret",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 *20,
        secure: false
    },
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "session",
        sidfieldname:"sid",
        createtable: true,
        clearInterval: 60000,
    })
    
}))

configMiddleware(server)


server.get("/", (req, res)=> {
    res.send(`<h1>Your server is up an running</h1>`)
})

server.use("/api", apiRouter)

module.exports = server