const express = require('express')
const { createResult, getPeroid, getAllResult, deleteResult } = require('../controler/resultControler')

const router = express.Router()

router.post("/results" , createResult)
router.get("/peroid" , getPeroid)
router.get("/allResult" , getAllResult)
router.delete("/result/:id" , deleteResult)


module.exports = router