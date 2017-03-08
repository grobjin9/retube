import * as constants from '../constants/roomsConstants';

function roomsReducer(state = rooms, action) {
  switch (action.type) {
    
    case constants.FETCH_ROOMS_START:
      return {
        ...state,
        done: false,
        isLoading: true
      };
    case constants.FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.rooms,
        count: action.count,
        done: action.done
      };
    case constants.FETCH_ROOMS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case constants.FETCH_PARTIAL_ROOMS_START:
      return {
        ...state,
        isLoading: true
      };
    case constants.FETCH_PARTIAL_ROOMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        done: action.done,
        list: [...state.list, ...action.rooms],
        count: action.count
      };
    case constants.FETCH_PARTIAL_ROOMS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case constants.CREATE_ROOM_START:
      return {
        ...state
      };
    case constants.CREATE_ROOM_SUCCESS:
      return {
        ...state,
        count: state.count + 1,
        list: [action.room].concat(state.list)
      };
    case constants.CREATE_ROOM_ERROR:
      return {
        ...state,
        error: action.error
      };

    case constants.DELETE_ROOM_START:
      return {
        ...state
      };
    case constants.DELETE_ROOM_SUCCESS:
      return {
        ...state,
        count: state.count - 1,
        list: state.list.filter(room => room._id !== action.roomId)
      };
    case constants.DELETE_ROOM_ERROR: {
      return {
        ...state,
        error: action.error
      };
    }

    case constants.ADD_ROOM_TO_FAVORITES:
      return {
        ...state,
        list: state.list.map(room => {
          if (room._id === action.roomId) {
            room.favorite = true;
          }

          return room;
        })
      };
    case constants.REMOVE_ROOM_FROM_FAVORITES:
      return {
        ...state,
        list: state.list.map(room => {
          if (room._id === action.roomId) {
            room.favorite = false;
          }

          return room;
        })
      };

    case constants.SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.filter
      };
    default:
      return state;
  }
}

export default roomsReducer;