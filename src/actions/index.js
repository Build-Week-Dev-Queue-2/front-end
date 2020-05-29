export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";
export const FETCH_ALL_TICKETS = "FETCH_ALL_TICKETS";
export const CREATE_TICKET = "CREATE_TICKET";
export const EDIT_TICKET = "EDIT_TICKET";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const MARK_RESOLVED = "MARK_RESOLVED";

export const userLogin = (user) => {
  return { type: USER_LOGIN, payload: user };
};

export const userRegister = (user) => {
  return { type: USER_REGISTER, payload: user };
};

export const fetchAllTickets = (tickets) => {
  return { type: FETCH_ALL_TICKETS, payload: tickets };
};

export const fetchComments = (comments) => {
  return { type: FETCH_COMMENTS, payload: comments };
};

export const createComment = (comment) => {
  return { type: CREATE_COMMENT, payload: comment };
};

export const createTicket = (ticket) => {
  return { type: CREATE_TICKET, payload: ticket };
};

export const editTicket = (ticket) => {
  return { type: EDIT_TICKET, payload: ticket };
};

export const markResolved = (ticket) => {
  return { type: MARK_RESOLVED, payload: ticket };
};
