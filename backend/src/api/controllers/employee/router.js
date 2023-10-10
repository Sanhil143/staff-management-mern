const router = require('express')()
const {addEmployee} = require('./controller')
const {adminMiddle} = require('../../middlewares/jwtMiddleware')

router.post('/addEmployee',adminMiddle,addEmployee);


module.exports = router;