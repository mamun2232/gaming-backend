const express = require('express')
const { withdrowRequest, allWithdrowRequstCallect, withdrowPayHendler } = require('../controler/withdrowControler')

const router = express.Router()

// import all controler 
router.post("/withdrow", withdrowRequest)
router.get("/allWithdrow", allWithdrowRequstCallect)
router.put("/status/:id", withdrowPayHendler)


module.exports = router