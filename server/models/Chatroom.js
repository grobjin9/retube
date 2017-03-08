const mongoose = require('mongoose');

const AccessError = require('../errors/AccessError');
const UndefinedResourceError = require('../errors/UndefinedResourceError');
const DuplicationError = require('../errors/DuplicationError');
const ServerError = require('../errors/ServerError');

const Message = require('./Message');

const chatroomSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  creator_id: {
    type: String,
    required: true
  }
});

chatroomSchema.set('timestamps', true);

/*
 * Static methods
 * */
chatroomSchema.statics.getRooms = function (req, res) {
  const findQuery = queryManager(req.query, req.user);
  const sortBy = {createdAt: req.query.sortBy === 'date_desc' ? -1 : 1};
  const sortByPopular = req.query.sortBy === 'popular';
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = 10;

  const Chatroom = this;

  let pipeline = [
    {
      $match: findQuery
    },
    {
      $project: {
        name: true,
        description: true,
        tags: true,
        creator_id: true,
        createdAt: true,
        count: {
          $cond: {
            if: sortByPopular,
            then: {
              $size: "$total_messages"
            },
            else: false
          }
        },
        favorite: {
          "$anyElementTrue": [
            {
              '$ifNull': [
                {
                  "$map": {
                    "input": req.user.favoriteChatrooms.map(room => mongoose.Types.ObjectId(room)),
                    "as": "el",
                    "in": {
                      $eq: ["$_id", "$$el"]
                    }
                  }
                },
                [false]
              ]
            }
          ]
        }
      }
    },
    {
      $sort: sortByPopular ? {count: -1} : sortBy
    },
    {
      $skip: offset
    },
    {
      $limit: limit
    }
  ];

  if (sortByPopular) {
    pipeline.splice(1, 0, {
      $lookup: {
        from: "messages", localField: "_id", foreignField: "chatroom_id", as: "total_messages"
      }
    });
  }

  Chatroom
    .aggregate(pipeline)
    .then(rooms => {
      Chatroom.count()
        .then(count => {
          const isDone = rooms.length < limit;

          return res.status(200).json({
            done: isDone,
            rooms,
            count,
            favoriteChatrooms: req.user.favoriteChatrooms
          });
        })
        .catch(error => {
          return res.status(500).json(error.message || new ServerError("Error connecting to database"));
        });
    })
    .catch(error => {
      return res.status(500).json(error.message || "Error connecting to database");
    });
};

chatroomSchema.statics.createRoom = function (req, res) {
  const {name, description, tags} = req.body;

  const Chatroom = this;

  Chatroom.findOne({name: name})
    .then(room => {
      if (!room) {
        let newRoomObject = {name, description, tags, creator_id: req.user._id};
        const newRoom = new Chatroom(newRoomObject);

        newRoom.save()
          .then((savedRoom) => {
            newRoomObject.createdAt = savedRoom.createdAt;
            newRoomObject._id = savedRoom._id;
            newRoomObject.favorite = false;

            return res.status(201).json({room: newRoomObject});
          })
          .catch(error => {
            return res.status(500).json(error.message || "Error connecting to database");
          });
      } else {
        return res.status(400).json(`"${name}" room has been created already`);
      }
    })
    .catch(error => {
      res.status(500).json(error.message || "Error connecting to database");
    });
};

chatroomSchema.statics.deleteRoom = function (roomId, createdBy, isAdmin) {
  const Chatroom = this;

  return new Promise((resolve, reject) => {
    Chatroom.findOne({_id: roomId})
      .then(validateRequest)
      .then(room => room.remove())
      .then(deletedRoom => {
        resolve(deletedRoom);

        return deletedRoom;
      })
      .then(deletedRoom => Message.find({chatroom_id: deletedRoom._id}).remove())
      .catch(() => {
        reject(new ServerError("Error connecting to database"));
      });

    function validateRequest(room) {
      if (room.creator_id !== createdBy && !isAdmin) {
        reject(new AccessError("Deletion is not allowed"));
      }

      if (!room) {
        reject(new UndefinedResourceError("Requested resource does not exist"));
      }

      return room;
    }
  });
};

/*
 * Helper functions
 * */
function queryManager(query, user) {
  if (query.tag) {
    return {tags: {$in: [query.tag]}};
  } else if (query.sortBy === 'favorites') {
    return {_id: {$in: user.favoriteChatrooms.map(room => mongoose.Types.ObjectId(room))}};
  } else if (query.sortBy === 'by_me') {
    return {creator_id: user._id}
  } else {
    return {};
  }
}

const ChatroomModel = mongoose.model('Chatroom', chatroomSchema);

module.exports = ChatroomModel;