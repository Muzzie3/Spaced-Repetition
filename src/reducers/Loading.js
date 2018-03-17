export default (loading = false, action) => {
  switch (action.type) {
    case "LOADING":
      return true;
    case "READY":
      return false;
    default:
      return loading;
  }
};
