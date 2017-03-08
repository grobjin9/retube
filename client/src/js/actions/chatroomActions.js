import axios from 'axios';
import * as constants from '../constants/chatroomConstants';

export function joinChatroom(user) {
  return {
    type: constants.JOIN_CHATROOM,
    user
  };
}

export function leaveChatroom(userId) {
  return {
    type: constants.LEAVE_CHATROOM,
    userId
  };
}

export function refreshChatroom() {
  return {
    type: constants.REFRESH_CHATROOM
  };
}

export const updateUsersCounter = function (counter) {
  return {
    type: constants.UPDATE_USERS_COUNTER,
    counter
  };
};

export const sendMessage = function (message) {
  return {
    type: constants.SEND_CHATROOM_MESSAGE,
    message
  };
};

function fetchChatroomMessagesStart(chatroomId, name) {
  return {
    type: constants.FETCH_CHATROOM_MESSAGES_START,
    chatroomId,
    name
  };
}

function fetchChatroomMessagesSuccess(messages, done) {
  return {
    type: constants.FETCH_CHATROOM_MESSAGES_SUCCESS,
    messages,
    done
  };
}

function fetchChatroomMessagesError(error) {
  return {
    type: constants.FETCH_CHATROOM_MESSAGES_ERROR,
    error
  };
}

function fetchPartialChatroomMessagesStart(chatroomId) {
  return {
    type: constants.FETCH_PARTIAL_CHATROOM_MESSAGES_START,
    chatroomId
  };
}

function fetchPartialChatroomMessagesSuccess(messages, done) {
  return {
    type: constants.FETCH_PARTIAL_CHATROOM_MESSAGES_SUCCESS,
    done,
    messages
  };
}

function fetchPartialChatroomMessagesError(error) {
  return {
    type: constants.FETCH_PARTIAL_CHATROOM_MESSAGES_ERROR,
    error
  };
}

export function fetchChatroomMessagesRequest(chatroomId) {
  return function (dispatch, getState) {
    const {rooms: {list: rooms}} = getState();
    const name = rooms.find(room => room._id === chatroomId).name;


    dispatch(fetchChatroomMessagesStart(chatroomId, name));

    const query = {
      params: {
        chatroom: chatroomId
      }
    };

    axios.get('/api/messages', query)
      .then(messages => {
        dispatch(fetchChatroomMessagesSuccess(messages.data.messages, messages.data.done));
      })
      .catch(error => {
        dispatch(fetchChatroomMessagesError(error.message));
      })
  };
}

export function fetchPartialChatroomMessagesRequest() {
  return function (dispatch, getState) {

    const {id, messages} = getState().chatroom;

    const query = {
      params: {
        chatroom: id,
        offset: messages.length
      }
    };

    dispatch(fetchPartialChatroomMessagesStart(id));

    axios.get('/api/messages', query)
      .then(messages => {
        dispatch(fetchPartialChatroomMessagesSuccess(messages.data.messages, messages.data.done));
      })
      .catch(error => {
        dispatch(fetchPartialChatroomMessagesError(error.message));
      })
  };
}
