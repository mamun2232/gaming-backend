const express = require('express')
const { registerUser, loginUser, getAllUser, singleUser, deleteUser } = require('../controler/userControler')
const router = express.Router()

// import all controler 
router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/user" , getAllUser)
router.get("/user/:id" , singleUser)
router.delete("/user/:id" , deleteUser)


module.exports = router