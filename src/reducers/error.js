const INITIAL_STATE = null;

export function error(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_ERROR":
      return action.error;

    case "CLEAR_ERROR":
      return null;

    default:
      return state;
  }
}
