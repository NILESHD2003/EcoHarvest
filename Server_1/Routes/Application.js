const express = require('express');
const router = express.Router();

const {checkUpdate} = require('../Controllers/Application');

router.post('/check-update', checkUpdate);

module.exports = router;