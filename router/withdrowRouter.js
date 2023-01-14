const express = require('express')
const { withdrowRequest } = require('../controler/withdrowControler')

const router = express.Router()

// import all controler 
router.post("/withdrow", withdrowRequest)


module.exports = router