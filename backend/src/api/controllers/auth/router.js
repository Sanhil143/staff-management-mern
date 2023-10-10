const router = require('express')();
const {adminMiddle} = require('../../middlewares/jwtMiddleware')
const {userSignin} = require('./controller');

router.post('/userSignin',userSignin);

module.exports = router