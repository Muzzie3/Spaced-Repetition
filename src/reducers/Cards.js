export default (cards = [], action) => {
  switch (action.type) {
    case "UPDATE_CARDS":
      return action.payload.cards;
    default:
      return cards;
  }
};
