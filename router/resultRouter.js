const express = require('express')
const { createResult, getPeroid, getAllResult } = require('../controler/resultControler')

const router = express.Router()

router.post("/results" , createResult)
router.get("/peroid" , getPeroid)
router.get("/allResult" , getAllResult)


module.exports = router