import { useReducer, useEffect } from "react";

const initialState = { guests: 2 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { guests: Math.min(state.guests + 1, 25) };
    case "decrement":
      return { guests: Math.max(state.guests - 1, 1) };
    // case "reset":
    //   return { guests: 0 };
    default:
      throw new Error();
  }
}

export default function NumberOfGuests({ register, setValue }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setValue("numberOfGuests", state.guests);
  }, [state.guests, setValue]);

  return (
    <div>
      <label htmlFor="guests">Number of Guests:</label>
      <div>
        <button type="button" onClick={() => dispatch({ type: "decrement" })}>
          &#45;
        </button>
        <input {...register("numberOfGuests")} type="number" id="guests" name="guests" min="1" max="25" defaultValue={state.guests} />
        <button type="button" onClick={() => dispatch({ type: "increment" })}>
          &#43;
        </button>
      </div>
    </div>
  );
}
