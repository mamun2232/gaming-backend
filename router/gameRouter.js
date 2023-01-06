const express = require('express')
const { playGame,  } = require('../controler/gameContoler')
const router = express.Router()

router.post("/win" , playGame)
// router.get("/win" , getDataFiveMinuteAgo)

module.exports = router