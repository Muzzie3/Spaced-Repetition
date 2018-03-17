export default (viewDeck = false, action) => {
  switch (action.type) {
    case "CHANGE_VIEW":
      return !viewDeck;
    default:
      return viewDeck;
  }
};
