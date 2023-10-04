const router = require('express')()
const {updateUser} = require('../user/controller')

router.patch('/updateUser',updateUser);


module.exports = router;