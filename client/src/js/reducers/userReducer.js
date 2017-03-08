import { user } from './initialState';
import { UPDATE_USER, KILL_USER, UPDATE_FAVORITE_ROOMS_COUNT } from '../constants/userConstants';

function userReducer(state = user, action) {
  switch(action.type) {
    case UPDATE_USER:
      return {
        ...state,
        id: action.id,
        username: action.username,
        avatar: action.avatar
      };
    case KILL_USER:
      return {
        id: '',
        username: '',
        avatar: '',
        rooms: []
      };
    case UPDATE_FAVORITE_ROOMS_COUNT:
      return {
        ...state,
        favoriteRoomsCount: action.count
      };
    
    default:
      return state;
  }
}

export default userReducer;

