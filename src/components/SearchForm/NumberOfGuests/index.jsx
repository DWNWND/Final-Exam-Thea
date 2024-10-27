import { useReducer } from "react";

// This is our initial state
const initialState = { guests: 2 };

function reducer(state, action) {
  // These are actions that can be dispatched
  switch (action.type) {
    case "increment":
      if (state.guests >= 25) {
        return { guests: 25 };
      }
      return { guests: state.guests + 1 };
    case "decrement":
      if (state.guests <= 1) {
        return { guests: 1 };
      }
      return { guests: state.guests - 1 };
    case "reset":
      return { guests: 0 };
    default:
      throw new Error();
  }
}

//remember to have a min and max number of guests
export default function NumberOfGuests() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <label htmlFor="guests">Number of Guests:</label>
      <div>
        <button onClick={() => dispatch({ type: "decrement" })}>&#45;</button>
        <input type="number" id="guests" name="guests" min="1" max="25" defaultValue={state.guests} />
        <button onClick={() => dispatch({ type: "increment" })}>&#43;</button>
      </div>
    </div>
  );
}
