import {
  USER_LOGIN,
  USER_REGISTER,
  FETCH_ALL_TICKETS,
  CREATE_TICKET,
  EXPAND_TICKET,
  EDIT_TICKET,
} from "../actions/";

const savedUser = JSON.parse(sessionStorage.getItem("user"));
const initialState = {
  user: savedUser || {
    user_id: null,
    username: "",
    role: "",
    role_id: "",
  },
  tickets: [],
  expandedTicketId: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
      };
    case USER_REGISTER:
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
      };
    case FETCH_ALL_TICKETS:
      console.log({ session: savedUser, initialState });
      return {
        ...state,
        tickets: action.payload,
      };
    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case EXPAND_TICKET:
      return {
        ...state,
        expandedTicketId: action.payload,
      };
    case EDIT_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((ticket) => {
          return ticket.ticket_id === action.payload.ticket_id
            ? action.payload
            : ticket;
        }),
      };
    default:
      return state;
  }
};
