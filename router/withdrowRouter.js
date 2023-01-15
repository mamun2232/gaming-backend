const express = require('express')
const { withdrowRequest, allWithdrowRequstCallect, withdrowPayHendler, deleteWithdrow } = require('../controler/withdrowControler')

const router = express.Router()

// import all controler 
router.post("/withdrow", withdrowRequest)
router.delete("/withdrow/:id", deleteWithdrow)
router.get("/allWithdrow", allWithdrowRequstCallect)
router.put("/status/:id", withdrowPayHendler)


module.exports = router