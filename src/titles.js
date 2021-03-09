const INITIAL_STATE = [];

export function titles(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "VOTE":
      const updatedTitles = state.map((title) => {
        if (title.id === action.payload.id) {
          title.votes = action.payload.votes;
        }
        return title;
      });

      return updatedTitles;

    case "LOAD_TITLES":
      return action.payload;

    default:
      return state;
  }
}
