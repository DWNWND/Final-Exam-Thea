import { useReducer, useEffect } from "react";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import { useTravelSearchStore } from "../../../../../stores";

// Define the state and action types
interface State {
  guests: number;
}

type Action = { type: "increment" } | { type: "decrement" };

// Reducer function
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

// Props interface
interface NumberOfGuestsProps {
  color: string; // Specifies the color class name
  mainSearch?: boolean; // Optional prop, defaults to true
}

export function NumberOfGuests({ color, mainSearch = true }: NumberOfGuestsProps) {
  const { setNumberOfGuests, travelSearchData } = useTravelSearchStore();
  const initialState = travelSearchData.numberOfGuests;

  const [state, dispatch] = useReducer(reducer, { guests: initialState });

  useEffect(() => {
    setNumberOfGuests(state.guests);
  }, [state.guests, setNumberOfGuests]);

  return (
    <div className={`w-full md:w-auto flex justify-center md:justify-start items-center gap-4 lg:gap-2`}>
      {/* Decrement button */}
      <button className={`hover:shadow-md rounded-full w-full ${mainSearch ? "lg:h-10 lg:w-10 bg-white" : ""} flex justify-center text-xl items-center text-${color} border-${color} border p-2`} type="button" onClick={() => dispatch({ type: "decrement" })}>
        <HiOutlineMinusSm className={`text-${color}`} />
      </button>

      {/* Guests input (read-only) */}
      <input type="number" readOnly className={`text-center font-semibold flex justify-center bg-transparent items-center content-center text-${color}`} id="guests" name="guests" min="1" max="25" value={state.guests} />

      {/* Increment button */}
      <button className={`hover:shadow-md rounded-full w-full ${mainSearch ? "lg:h-10 lg:w-10 bg-white" : ""} flex justify-center text-xl items-center text-${color} border-${color} border p-2`} type="button" onClick={() => dispatch({ type: "increment" })}>
        <HiOutlinePlusSm className={`text-${color}`} />
      </button>

      <p className={`italic text-${color}`}>guests</p>
    </div>
  );
}

// import { useReducer, useEffect } from "react";
// // https://react-icons.github.io/react-icons/
// import { HiOutlinePlusSm } from "react-icons/hi";
// import { HiOutlineMinusSm } from "react-icons/hi";
// import { useTravelSearchStore } from "../../../../../stores";

// function reducer(state, action) {
//   switch (action.type) {
//     case "increment":
//       return { guests: Math.min(state.guests + 1, 25) };
//     case "decrement":
//       return { guests: Math.max(state.guests - 1, 1) };
//     // case "reset":
//     //   return { guests: 0 };
//     default:
//       throw new Error();
//   }
// }

// export default function NumberOfGuests({ color, mainSearch }) {
//   const { setNumberOfGuests, travelSearchData } = useTravelSearchStore();
//   const initialState = travelSearchData.numberOfGuests;

//   const [state, dispatch] = useReducer(reducer, { guests: initialState });

//   useEffect(() => {
//     // setValue("numberOfGuests", state.guests);
//     setNumberOfGuests(state.guests);
//   }, [state.guests]);

//   //add labels to the form inputs?
//   return (
//     <div className={`w-full md:w-auto flex justify-center md:justify-start items-center gap-4 lg:gap-2`}>
//       <button
//         className={`hover:shadow-md rounded-full w-full ${mainSearch && "lg:h-10 lg:w-10 bg-white"} flex justify-center text-xl items-center text-${color} border-${color} border p-2`}
//         type="button"
//         onClick={() => {
//           dispatch({ type: "decrement" });
//         }}>
//         <HiOutlineMinusSm className={`text-${color}`} />
//       </button>
//       <input type="number" readOnly className={`text-center font-semibold flex justify-center bg-transparent items-center content-center text-${color}`} id="guests" name="guests" min="1" max="25" value={state.guests} />
//       <button
//         className={`hover:shadow-md rounded-full  w-full ${mainSearch && "lg:h-10 lg:w-10 bg-white"} flex justify-center text-xl items-center text-${color} border-${color} border p-2`}
//         type="button"
//         onClick={() => {
//           dispatch({ type: "increment" });
//         }}>
//         <HiOutlinePlusSm className={`text-${color}`} />
//       </button>
//       <p className={`italic text-${color}`}>guests</p>
//     </div>
//   );
// }
