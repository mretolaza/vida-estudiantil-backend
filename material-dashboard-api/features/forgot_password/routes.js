const { wrap } = require('async-middleware');
const router = require('express').Router();

const requestBodyValidation = require('./commands/verify-request-body');
const updatePassword = require('./commands/update-user-password');

router.post('/update-user-password', wrap(requestBodyValidation), wrap(updatePassword));
