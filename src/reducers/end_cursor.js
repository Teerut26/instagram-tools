const end_cursor = (state = null, action) => {
    switch (action.type) {
      case "set_end_cursor":
        return state = action.playload;
      default:
        return state
    }
  };
  
  export { end_cursor };
  