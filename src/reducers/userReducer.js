import { USER_LOGIN, USER_REGISTER } from "../actions/userActions";

const initialState = {
  user: {
    user_id: "",
    username: "",
    role: "",
    role_id: "",
  },
  token: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.payload,
      };
    case USER_REGISTER:
      return {
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
