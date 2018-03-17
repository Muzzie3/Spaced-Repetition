const reduceCount = (count = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return count + 1;
    default:
      return count;
  }
};

export default reduceCount;
