const express = require('express');
const router = express.Router();

const Message = require('../models/Message');

router.get('/', function (req, res, next) {
  const chatroom = req.query.chatroom;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = 10;

  Message
    .find({chatroom_id: chatroom})
    .limit(limit)
    .skip (offset)
    .sort({
      createdAt: -1
    })
    .populate('creator', 'username avatar')
    .select('_id createdAt chatroom_id creator text')
    .then(messages => {
      const isDone = messages.length < limit;

      return res.status(200).json({
        done: isDone,
        messages: messages.reverse()
      });
    })
    .catch(error => {

      return res.status(500).json({
        error: error.message || "Error connecting to database"
      });
    });
});

module.exports = router;