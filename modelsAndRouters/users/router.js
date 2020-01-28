const express = require("express")
const bcrypt = require("bcryptjs")
const db = require("./model")

const router = express.Router()


function restricted() {
    return async (req,res, next) => {
        const authError = {
            message: "Invalid Credentials"
        }
        try{
            const { username, password } = req.headers
            if (!username || !password){
                return res.status(401).json(authError)
            }

            const user = await db.findBy({ username }).first()
            if (!user) {
                return res.status(401).json(authError)
            }

            const passwordValid = await bcrypt.compareSync(password, user.password)
            if(!passwordValid) {
                return res.status(401).json(authError)
            }

            next()

        }

        catch (err){
            next(err)
        }

    }
}


router.get('/', restricted(), async (req, res) => {

    try{
        res.status(200).json(await db.getAllUsers())
    }

    catch (err){
        res.status(500).json({ message: `500 Error`})
    }
    
  });


module.exports = router