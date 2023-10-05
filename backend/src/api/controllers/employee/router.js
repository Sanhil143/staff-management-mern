const router = require('express')()
const {createEmployee} = require('./controller')

router.post('/createEmployee',createEmployee);


module.exports = router;