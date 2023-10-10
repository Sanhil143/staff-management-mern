const router = require('express')();
const {punchIn} = require('./controller')

router.patch('/punchIn/:userId',punchIn);

module.exports = router;