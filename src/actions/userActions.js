export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";

export const userLogin = (token) => {
  return { type: USER_LOGIN, payload: token };
};

export const userRegister = (user) => {
  return { type: USER_REGISTER, payload: user };
};
