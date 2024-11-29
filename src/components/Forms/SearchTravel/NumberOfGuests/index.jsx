import { useReducer, useEffect } from "react";
// https://react-icons.github.io/react-icons/
import { HiOutlinePlusSm } from "react-icons/hi";
import { HiOutlineMinusSm } from "react-icons/hi";
import { useSearchStore } from "../../../../stores/useSearchStore.js";

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

export default function NumberOfGuests({ register, setValue, color, mainSearch }) {
  const { setNumberOfGuests, travelSearchData } = useSearchStore();
  const initialState = travelSearchData.numberOfGuests;

  const [state, dispatch] = useReducer(reducer, { guests: initialState });

  useEffect(() => {
    // setValue("numberOfGuests", state.guests);
    setNumberOfGuests(state.guests);
  }, [state.guests, setValue]);

  //add labels to the form inputs?
  return (
    <div className="w-full md:w-auto flex justify-center items-center gap-4 lg:gap-2">
      <button
        className={`hover:shadow-md rounded-full w-full ${mainSearch && "lg:h-10 lg:w-10"} flex justify-center text-xl items-center text-${color} border-${color} border p-2`}
        type="button"
        onClick={() => {
          dispatch({ type: "decrement" });
        }}>
        <HiOutlineMinusSm className={`text-${color}`} />
      </button>
      <input type="number" readOnly className={`text-center font-semibold flex justify-center bg-transparent items-center content-center text-${color}`} id="guests" name="guests" min="1" max="25" value={state.guests} />
      <button
        className={`hover:shadow-md rounded-full  w-full ${mainSearch && "lg:h-10 lg:w-10"} flex justify-center text-xl items-center text-${color} border-${color} border p-2`}
        type="button"
        onClick={() => {
          dispatch({ type: "increment" });
        }}>
        <HiOutlinePlusSm className={`text-${color}`} />
      </button>
      <p className={`italic text-${color}`}>guests</p>
    </div>
  );
}
