export default (mode = "study", action) => {
  switch (action.type) {
    case "STUDY":
      return action.payload.newMode;
    default:
      return mode;
  }
};
