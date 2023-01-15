const express = require('express')
const { reahargeRequrest, allReachrgeRequst, userReachrge, deleteRecharge } = require('../controler/reachargeControler')


const router = express.Router()

// import all controler 
router.post("/reachrge", reahargeRequrest)
router.get("/allReachrge", allReachrgeRequst)
router.put("/reachrge", userReachrge)
router.delete("/reachrge/:id", deleteRecharge)


module.exports = router