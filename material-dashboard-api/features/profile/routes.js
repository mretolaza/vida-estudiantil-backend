const { wrap } = require('async-middleware');
const router = require('express').Router();

const requestBodyValidation = require('./commands/verify-request-body');
const updateUserInfo = require('./commands/update-user-info');
const retrievePersona = require('./commands/retrieve-persona');

router.post('/update-profile-info', wrap(requestBodyValidation), wrap(updateUserInfo));
router.get('/retrieve-persona/:id', wrap(requestBodyValidation), wrap(retrievePersona));

module.exports = router;
