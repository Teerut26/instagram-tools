const is_loading = (state = false, action) => {
  switch (action.type) {
    case "set_is_loading":
      return (state = action.playload);
    default:
      return state;
  }
};

export { is_loading };
