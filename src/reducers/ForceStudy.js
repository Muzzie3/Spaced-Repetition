export default (forceStudy = false, action) => {
  switch (action.type) {
    case "TOGGLE_FORCE_STUDY":
      return !forceStudy;
    default:
      return forceStudy;
  }
};
