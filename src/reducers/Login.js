export default (token = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload.token;
    case "LOGOUT":
      return null;
    default:
      return token;
  }
};
