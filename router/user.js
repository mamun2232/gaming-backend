const express = require('express')
const { registerUser, loginUser, getAllUser, singleUser, deleteUser, cheackAdmin } = require('../controler/userControler')
const verifayToken = require('../utilitis/verifayToken')
const router = express.Router()

// import all controler 
router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/user" , getAllUser)
router.get("/user/:id" , singleUser)
router.delete("/user/:id" , deleteUser)
router.get("/chackAdmin/:email", verifayToken, cheackAdmin)


module.exports = router