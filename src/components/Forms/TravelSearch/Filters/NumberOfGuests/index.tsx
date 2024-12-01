import { useReducer, useEffect } from "react";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import { useTravelSearchStore } from "../../../../../stores";

interface State {
  guests: number;
}

type Action = { type: "increment" } | { type: "decrement" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { guests: Math.min(state.guests + 1, 25) };
    case "decrement":
      return { guests: Math.max(state.guests - 1, 1) };
    default:
      throw new Error("Unhandled action type");
  }
}

interface NumberOfGuestsProps {
  color: string;
  mainSearch?: boolean;
}

export function NumberOfGuests({ color, mainSearch = true }: NumberOfGuestsProps): JSX.Element {
  const { setNumberOfGuests, travelSearchData } = useTravelSearchStore();
  const initialState = travelSearchData.numberOfGuests;

  const [state, dispatch] = useReducer(reducer, { guests: initialState });

  useEffect(() => {
    setNumberOfGuests(state.guests);
  }, [state.guests, setNumberOfGuests]);

  return (
    <div className={`w-full md:w-auto flex justify-center md:justify-start items-center gap-4 lg:gap-2`}>
      <button className={`hover:shadow-md rounded-full w-full ${mainSearch ? "lg:h-10 lg:w-10 bg-white bg-opacity-50 hover:bg-opacity-100" : ""} flex  transition ease-in-out justify-center text-xl items-center text-${color} border-${color} border p-2`} type="button" onClick={() => dispatch({ type: "decrement" })}>
        <HiOutlineMinusSm className={`text-${color}`} />
        <p className="sr-only">decrement</p>
      </button>
      <input type="number" readOnly className={`text-center font-semibold flex justify-center bg-transparent items-center content-center text-${color}`} id="guests" name="guests" min="1" max="25" value={state.guests} />
      <button className={`hover:shadow-md rounded-full w-full ${mainSearch ? "lg:h-10 lg:w-10 bg-white bg-opacity-50 hover:bg-opacity-100 " : ""} flex transition ease-in-out justify-center text-xl items-center text-${color} border-${color} border p-2`} type="button" onClick={() => dispatch({ type: "increment" })}>
        <HiOutlinePlusSm className={`text-${color}`} />
        <p className="sr-only">increment</p>
      </button>
      <label htmlFor="guests" className={`italic text-${color}`}>
        guests
      </label>
    </div>
  );
}
