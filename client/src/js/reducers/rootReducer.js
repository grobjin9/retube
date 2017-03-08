import initialState from './initialState';
import authReducer from './authReducer';
import userReducer from './userReducer';
import roomsReducer from './roomsReducer';
import chatroomReducer from './chatroomReducer';

const rootReducer = (state = initialState, action) => {
  return {
    auth: authReducer(state.auth, action),
    user: userReducer(state.user, action),
    rooms: roomsReducer(state.rooms, action),
    chatroom: chatroomReducer(state.chatroom, action)
  };
};

export default rootReducer;