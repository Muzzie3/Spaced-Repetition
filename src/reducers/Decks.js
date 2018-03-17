export default (decks = [], action) => {
  switch (action.type) {
    case "UPDATE_DECKS":
      return action.payload.decks;
    default:
      return decks;
  }
};
