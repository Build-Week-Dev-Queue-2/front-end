import {
  USER_LOGIN,
  USER_REGISTER,
  FETCH_ALL_TICKETS,
  CREATE_TICKET,
  EDIT_TICKET,
  FETCH_COMMENTS,
  MARK_RESOLVED,
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
  ticketToEdit: null,
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
    case FETCH_COMMENTS:
      const comments = action.payload.reduce((obj, comment) => {
        obj[comment.ticket_id] = obj[comment.ticket_id]
          ? [...obj[comment.ticket_id], comment]
          : [comment];
        return obj;
      }, {});
      return {
        ...state,
        comments,
      };
    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case EDIT_TICKET:
      return {
        ...state,
        ticketToEdit: action.payload.ticket_id,
      };
    case MARK_RESOLVED:
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
