const mongoose = require('../mongoose');

const fakeUsers = require('./fakeUsers.json');
const fakeChatRooms = require('./fakeChatRooms.json');
const fakeMessages = require('./fakeMessages.json');

/*
* This module is intended to create a test database and fill it fill it with some fake data
* */

let User,
    ChatRoom,
    Message;

mongoose.connection.on('open', function () {
  dropDatabase()
    .then(ensureIndexes)
    .then(populateFakeUsers)
    .then(populateFakeChatRooms)
    .then(populateFakeMessages)
    .then(closeConnection)
    .catch(error => {
      closeConnection();

      console.log(error);
    });
});

function dropDatabase() {
  return mongoose.connection.dropDatabase();
}

function ensureIndexes() {
  User = require('../../models/User');
  ChatRoom = require('../../models/Chatroom');
  Message = require('../../models/Message');

  const models = Object.keys(mongoose.models).map(model => mongoose.models[model].ensureIndexes());

  return Promise.all(models);
}

function populateFakeUsers() {
  const users = fakeUsers.map(({username, password}) => {
    return (new mongoose.models.User({username, password}).save());
  });

  return Promise.all(users);
}

function populateFakeChatRooms(users) {
  const chatrooms = fakeChatRooms.map(({creator_username, name, description, tags}) => {
    const user = users.find((user) => user.username === creator_username);

    return (new ChatRoom({creator_id: user._id, name, description, tags}).save());

  });

  return Promise.all([users, Promise.all(chatrooms)]);
}

function populateFakeMessages(data) {
  const [users, chatrooms] = [data[0], data[1]];

  const messages = fakeMessages.map(({username, text}) => {
    const messageBy = users.find(user => user.username === username);
    const messageFrom = chatrooms.find(room => room.creator_id == messageBy._id);

    if (messageBy && messageFrom) {
      const message = new Message({
        chatroom_id: messageFrom._id,
        creator: messageBy._id,
        time: new Date(),
        text
      });

      return message.save();
    }

  });

  return Promise.all(messages);
}

function closeConnection() {
  return mongoose.disconnect();
}