const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()

const usersDB = require("../users/model.js")


router.post("/register", async (req, res) => {
   
    console.log(req.body)
    
    try {
        res.status(201).json( await usersDB.addNewUser(req.body))
    }
    
    catch(err){
        res.status(500).json({message: `ERROR 500`})
    }
})


router.post("/login", async (req, res) => {

    let { username, password } = req.body;

    try {
        const user = await usersDB.findBy({ username })
        if (user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({ message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    }
    
    catch(err){
        res.status(500).json(error)
    }
})

module.exports = router