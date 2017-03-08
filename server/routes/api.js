const express = require('express');
const router = express.Router();

const rooms = require('./rooms');
const messages = require('./messages');

router.use('/rooms', rooms);
router.use('/messages', messages);

module.exports = router;