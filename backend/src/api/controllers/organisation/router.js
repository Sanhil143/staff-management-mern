const router = require('express')();
const { addOrganisation } = require('./controller');

router.post('/addOrganisation',addOrganisation)


module.exports = router;