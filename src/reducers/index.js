import {
  USER_LOGIN,
  USER_REGISTER,
  CREATE_TICKET,
  FETCH_ALL_TICKETS,
  CREATE_COMMENT,
  FETCH_COMMENTS,
  MARK_RESOLVED,
} from "../actions/";

const initialState = {
  user: {
    user_id: null,
    username: "",
    role: "",
    role_id: "",
  },
  comments: {},
  tickets: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
      };
    case USER_REGISTER:
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
      };
    case FETCH_ALL_TICKETS:
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
    case CREATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.ticket_id]: state.comments[action.payload.ticket_id]
            ? [...state.comments[action.payload.ticket_id], action.payload]
            : [action.payload],
        },
      };
    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
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
