const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  chatroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

messageSchema.set('timestamps', true);

module.exports = mongoose.model('Message', messageSchema);