const express = require('express')
const { playGame, findAllGame, winGameFacebook, winGameTiktok, myGameRecorde,   } = require('../controler/gameContoler')
const router = express.Router()

router.post("/win" , playGame)
// router.get("/win" , getDataFiveMinuteAgo)
router.get("/game/:peroid" , findAllGame)
router.put("/game/win", winGameFacebook)
router.put("/game/win/tiktok", winGameTiktok)
router.get("/record/:userId" , myGameRecorde)
module.exports = router