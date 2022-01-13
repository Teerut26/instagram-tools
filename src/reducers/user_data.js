const user_data = (state = null, action) => {
  switch (action.type) {
    case "set_user_data":
      return state = action.playload;
    default:
      return state
  }
};

export { user_data };
