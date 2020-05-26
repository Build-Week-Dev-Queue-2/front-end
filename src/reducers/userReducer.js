import {
  USER_LOGIN,
  USER_REGISTER,
  CREATE_TICKET,
  FETCH_ALL_TICKETS,
} from "../actions/userActions";

const initialState = {
  user: {
    user_id: "",
    username: "",
    role: "",
    role_id: "",
  },
  tickets: [],
  token: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case USER_REGISTER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case FETCH_ALL_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };
    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    default:
      return state;
  }
};
