const router = require('express')();
const {adminMiddle} = require('../../middlewares/jwtMiddleware')
const {userSignin} = require('./controller');

router.post('/userSignin',adminMiddle,userSignin);

module.exports = router