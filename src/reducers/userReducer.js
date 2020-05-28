import {
  USER_LOGIN,
  USER_REGISTER,
  CREATE_TICKET,
  FETCH_ALL_TICKETS,
  FETCH_COMMENTS,
} from "../actions/userActions";

const initialState = {
  user: {
    user_id: "",
    username: "",
    role: "",
    role_id: "",
  },
  comments: {},
  openTickets: [],
  resolvedTickets: [],
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
      const openTickets = action.payload.filter((ticket) => {
        return ticket.resolved === "false";
      });
      const resolvedTickets = action.payload.filter((ticket) => {
        return ticket.resolved === "true";
      });
      return {
        ...state,
        openTickets,
        resolvedTickets,
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
        openTickets: [...state.openTickets, action.payload],
      };
    default:
      return state;
  }
};
