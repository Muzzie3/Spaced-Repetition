export default (currentDeck = "", action) => {
  switch (action.type) {
    case "SELECT_DECK":
      return action.payload.deckName;
    default:
      return currentDeck;
  }
};
