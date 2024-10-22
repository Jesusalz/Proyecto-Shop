const initialState = {
  isLoggedIn: false,
  name: '',
  
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.name,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}