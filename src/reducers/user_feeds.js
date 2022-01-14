const user_feeds = (state = null, action) => {
    switch (action.type) {
      case "set_user_feeds":
        return state = action.playload;
      default:
        return state
    }
  };
  
  export { user_feeds };
  