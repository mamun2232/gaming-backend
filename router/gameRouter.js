const express = require("express");
const {
  playGame,
  findAllGame,
  winGameFacebook,
  winGameTiktok,
  myGameRecorde,
  deleteRecode,
} = require("../controler/gameContoler");
const router = express.Router();

router.post("/win", playGame);
// router.get("/win" , getDataFiveMinuteAgo)
router.get("/game/:peroid", findAllGame);
router.put("/game/win", winGameFacebook);
router.put("/game/win/tiktok", winGameTiktok);
router.get("/record/:userId", myGameRecorde);
router.delete("/record/:id", deleteRecode);
module.exports = router;
