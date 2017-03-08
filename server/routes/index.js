const express = require('express');
const path = require('path');
const router = express.Router();

router.get('*', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '../', '../', 'client', 'public', 'index.html'));
});

module.exports = router;
