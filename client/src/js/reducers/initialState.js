const initialState = {
  auth: {
    isAuthenticated: false,
    error: null
  },
  user: {
    id: null,
    username: '',
    avatar: '',
    favoriteRoomsCount: 0
  },
  rooms: {
    visibilityFilter: 'all',
    list: [],
    count: 0,
    done: false,
    isLoading: false,
    error: null
  },
  chatroom: {
    id: '',
    name: '',
    messages: [],
    users: [],
    done: false,
    isLoading: false,
    error: null,
    counter: ''
  },
  ui: {
    
  }
};

export default initialState;