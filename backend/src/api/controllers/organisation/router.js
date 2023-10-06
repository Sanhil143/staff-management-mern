const router = require('express')();
const { addOrganisation, allOrganisations } = require('./controller');

router.post('/addOrganisation',addOrganisation);
router.get('/allOrganisations',allOrganisations);


module.exports = router;