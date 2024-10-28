import { useReducer, useEffect } from "react";
// https://react-icons.github.io/react-icons/
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiOutlineMinusSm } from "react-icons/hi";

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

  //add labels to the form inputs?
  return (
    <div className="w-full flex justify-center items-center gap-4">
      <button className="rounded-full h-10 w-10 flex justify-center text-xl items-center text-primary-green border-primary-green border p-2" type="button" onClick={() => dispatch({ type: "decrement" })}>
        <HiOutlineMinusSm className="text-primary-green" />
      </button>
      <input className="text-center text-primary-green" {...register("numberOfGuests")} type="number" id="guests" name="guests" min="1" max="25" defaultValue={state.guests} />
      <button className="rounded-full h-10 w-10 flex justify-center text-xl items-center text-primary-green border-primary-green border p-2" type="button" onClick={() => dispatch({ type: "increment" })}>
        <HiOutlinePlusSm className="text-primary-green" />
      </button>
      <p className="italic text-primary-green">guests</p>
    </div>
  );
}
