const INITIAL_STATE = false;

export function loading(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "START_LOADING":
      return true;

    case "FINISH_LOADING":
      return false;

    default:
      return state;
  }
}
