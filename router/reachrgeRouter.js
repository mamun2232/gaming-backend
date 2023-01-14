const express = require('express')
const { reahargeRequrest, allReachrgeRequst, userReachrge } = require('../controler/reachargeControler')


const router = express.Router()

// import all controler 
router.post("/reachrge", reahargeRequrest)
router.get("/allReachrge", allReachrgeRequst)
router.put("/reachrge", userReachrge)


module.exports = router