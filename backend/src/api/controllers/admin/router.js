const router = require('express')();
const {addAdmin} = require('./controller');


router.post('/addAdmin',addAdmin);


module.exports = router;