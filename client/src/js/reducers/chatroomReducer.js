import { chatroom } from './initialState';
import * as constants from '../constants/chatroomConstants';

function chatroomReducer(state = chatroom, action) {
  switch(action.type) {
    case constants.JOIN_CHATROOM_START:
      return {
        ...state,
        id: action.id
      };
    
    case constants.FETCH_CHATROOM_MESSAGES_START:
      return {
        ...state,
        messages: [],
        isLoading: true,
        done: false,
        id: action.chatroomId,
        name: action.name
      };
    case constants.FETCH_CHATROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        messages: [...action.messages],
        done: action.done
      };
    case constants.FETCH_CHATROOM_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case constants.FETCH_PARTIAL_CHATROOM_MESSAGES_START:
      return {
        ...state,
        isLoading: true,
        id: action.chatroomId
      };
    case constants.FETCH_PARTIAL_CHATROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        done: action.done,
        messages: [...action.messages, ...state.messages]
      };
    case constants.FETCH_PARTIAL_CHATROOM_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case constants.SEND_CHATROOM_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      };

    case constants.RECEIVE_CHATROOM_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.message)
      };

    case constants.UPDATE_USERS_COUNTER:
      return {
        ...state,
        counter: action.counter
      };

    case constants.JOIN_CHATROOM:
      return {
        ...state,
        users: [...state.users, action.user]
      };

    case constants.LEAVE_CHATROOM:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      };

    case constants.REFRESH_CHATROOM:
      return {
        id: '',
        name: '',
        messages: [],
        users: [],
        done: false,
        isLoading: false,
        error: null,
        counter: ''
      };
    
    default:
      return state;
  }
}

export default chatroomReducer;