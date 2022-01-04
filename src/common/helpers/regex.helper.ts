const PASSWORD =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const USERNAME = /^[a-z0-9_-]{3,15}$/;

export const RegExHelper = { PASSWORD, USERNAME };
