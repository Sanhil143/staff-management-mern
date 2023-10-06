const router = require('express')()
const {addEmployee} = require('./controller')

router.post('/addEmployee',addEmployee);


module.exports = router;