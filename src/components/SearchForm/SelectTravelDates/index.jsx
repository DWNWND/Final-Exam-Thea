import { useReducer, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CiCalendar } from "react-icons/ci";
import "flatpickr/dist/themes/material_green.css";
import { useSearchStore } from "../../../stores/useSearchStore.js";

function getFormattedDate(date) {
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

const todayString = getFormattedDate(new Date());
const tomorrowString = getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

// const initialState = {
//   travelDates: { startDate: todayString, endDate: tomorrowString }, // Store start and end date
// };

// Utility to calculate all dates between start and end
function generateAllTravelDates(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split("T")[0]); // Push date as "YYYY-MM-DD"
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return dates;
}

export default function SelectTravelDates({ color, tailw }) {
  const { travelSearchData, setTravelDates, setAllDatesArr } = useSearchStore();

  useEffect(() => {
    if (!travelSearchData.travelDates || Object.keys(travelSearchData.travelDates).length === 0) {
      // Set initial date range if empty
      setTravelDates({ startDate: todayString, endDate: tomorrowString });
      setAllDatesArr(generateAllTravelDates(todayString, tomorrowString));
    }
  }, [travelSearchData.travelDates]);

  const defaultDateString = `${travelSearchData.travelDates.startDate} to ${travelSearchData.travelDates.endDate}`;

  return (
    <div className={`${tailw} flex justify-between items-center rounded-full border-${color} border px-3 bg-white w-full`}>
      {travelSearchData.travelDates && travelSearchData.travelDates.startDate && travelSearchData.travelDates.endDate && (
        <>
          <Flatpickr
            className={`p-2 bg-transparent w-full font-semibold text-${color}`}
            options={{
              mode: "range",
              minDate: todayString, // Disable dates before today
              dateFormat: "Y-m-d",
              defaultDate: defaultDateString,
            }}
            onChange={(selectedDates) => {
              if (selectedDates.length === 2) {
                const start = getFormattedDate(selectedDates[0]);
                const end = getFormattedDate(selectedDates[1]);

                // Update Zustand store with date range
                setTravelDates({ startDate: start, endDate: end });

                // Generate all dates in range and set in Zustand
                const allDates = generateAllTravelDates(start, end);
                setAllDatesArr(allDates);
              }
            }}
          />
          <CiCalendar className={`text-2xl text-${color}`} />
        </>
      )}
    </div>
  );
}

// export default function SelectTravelDates({ register, setValue, color }) {
//   const { travelSearchData, setTravelDates, setAllDatesArr } = useSearchStore();

//   useEffect(() => {
//     if (!travelSearchData.travelDates || Object.keys(travelSearchData.travelDates).length === 0) {
//       // Set initial date range if not yet defined in the store
//       setTravelDates({ startDate: todayString, endDate: tomorrowString });
//     }
//     setValue("travelDates", travelSearchData.travelDates); // Sync Zustand state with react-hook-form
//   }, [travelSearchData.travelDates, setValue]);

//   // Helper function to generate all dates in the range
//   function generateAllDatesInRange(start, end) {
//     // Implement a function to generate all dates between start and end
//   }

//   const defaultDateString = `${travelSearchData.travelDates.startDate} to ${travelSearchData.travelDates.endDate}`;

//   return (
//     <div className={`flex justify-between items-center rounded-full border-${color} border px-3 bg-white w-full`}>
//       <Flatpickr
//         className={`p-2 bg-transparent w-full font-semibold text-${color}`}
//         options={{
//           mode: "range",
//           minDate: todayString, // Disable dates before today
//           dateFormat: "Y-m-d",
//           defaultDate: defaultDateString,
//         }}
//         onChange={(selectedDates) => {
//           if (selectedDates.length === 2) {
//             const start = getFormattedDate(selectedDates[0]);
//             const end = getFormattedDate(selectedDates[1]);

//             // Update Zustand store with new date range
//             setTravelDates({ startDate: start, endDate: end });

//             // Generate all dates within the range and set in Zustand
//             const allDates = generateAllDatesInRange(start, end);
//             setAllDatesArr(allDates);

//             // Sync with react-hook-form
//             setValue("travelDates", { startDate: start, endDate: end });
//             setValue("allDatesInRange", allDates);
//           }
//         }}
//       />
//       <CiCalendar className={`text-2xl text-${color}`} />
//       <input type="hidden" {...register("travelDates")} />
//     </div>
//   );
// }

// function dateReducer(state, action) {
//   switch (action.type) {
//     case "setStartDate":
//       return {
//         ...state,
//         startDate: action.payload,
//         endDate: state.endDate <= action.payload ? calculateNextDay(action.payload) : state.endDate,
//       };
//     case "setEndDate":
//       return {
//         ...state,
//         endDate: action.payload,
//       };
//     case "setTravelDates":
//       return {
//         ...state,
//         travelDates: { startDate: getFormattedDate(action.payload[0]), endDate: getFormattedDate(action.payload[1]) },
//       };
//     case "setAllDatesInRange":
//       const [start, end] = action.payload;
//       return {
//         ...state,
//         travelDates: action.payload,
//         allDatesInRange: start && end ? generatetravelDates(start, end) : [], // Generate all dates if both start and end are selected
//       };
//     default:
//       return state;
//   }
// }

// export default function SelectTravelDates({ register, setValue, color }) {
//   const [state, dispatch] = useReducer(dateReducer, initialState);
//   const { setTravelDates, setAllDatesArr, travelSearchData } = useSearchStore();

//   useEffect(() => {
//     // Update the form value whenever allDatesInRange changes
//     setValue("allDatesInRange", state.allDatesInRange);
//     setAllDatesArr(state.allDatesInRange);
//   }, [state.allDatesInRange, setValue]);

//   useEffect(() => {
//     setValue("travelDates", state.travelDates);
//   }, [state.travelDates]);

//   function isEmpty(obj) {
//     return JSON.stringify(obj) === "{}";
//   }

//   useEffect(() => {
//     if (isEmpty(travelSearchData.travelDates)) {
//       setTravelDates(initialState.travelDates);
//     }
//   }, []);

//   const defaultDateString = `${travelSearchData.travelDates.startDate} to ${travelSearchData.travelDates.endDate}`;

//   return (
//     <div className={`flex justify-between items-center rounded-full border-${color} border px-3 bg-white w-full`}>
//       <Flatpickr
//         className={`p-2 bg-transparent w-full font-semibold text-${color}`}
//         options={{
//           mode: "range",
//           minDate: todayString, // Disable dates before today
//           dateFormat: "Y-m-d",
//           defaultDate: defaultDateString,
//         }}
//         onChange={(selectedDates) => {
//           if (selectedDates.length === 2) {
//             // Only dispatch if both start and end dates are selected
//             const start = getFormattedDate(selectedDates[0]);
//             const end = getFormattedDate(selectedDates[1]);
//             dispatch({ type: "setTravelDates", payload: selectedDates });
//             setTravelDates({ startDate: start, endDate: end });

//             dispatch({ type: "setAllDatesInRange", payload: selectedDates });
//             // setValue("travelDates", { startDate: start, endDate: end });
//           }
//         }}
//       />
//       <CiCalendar className={`text-2xl text-${color}`} />
//       <input type="hidden" />
//     </div>
//   );
// }

// import { useReducer, useEffect } from "react";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { CiCalendar } from "react-icons/ci";
// import "flatpickr/dist/themes/material_green.css";

// const today = new Date();
// const tomorrow = new Date(today);
// tomorrow.setDate(today.getDate() + 1);

// const initialState = {
//   travelDates: { startDate: today, endDate: tomorrow }, // Store both start and end date in an array
//   allDatesInRange: [], // Store all dates in the range
// };

// function calculateNextDay(startDate) {
//   const nextDay = new Date(startDate);
//   nextDay.setDate(startDate.getDate() + 1);

//   console.log("nextDay", nextDay);

//   return nextDay;
// }

// function dateReducer(state, action) {
//   switch (action.type) {
//     case "setStartDate":
//       return {
//         ...state,
//         startDate: action.payload,
//         endDate: state.endDate <= action.payload ? calculateNextDay(action.payload) : state.endDate,
//       };
//     case "setEndDate":
//       return {
//         ...state,
//         endDate: action.payload,
//       };
//     case "setTravelDates":
//       return {
//         ...state,
//         startDate: action.payload[0] || "",
//         endDate: action.payload[1] || "",
//       };
//     case "setAllDatesInRange":
//       const [start, end] = action.payload;
//       return {
//         ...state,
//         travelDates: action.payload,
//         // allDatesInRange: start && end ? generatetravelDates(start, end) : [], // Generate all dates if both start and end are selected
//       };
//     default:
//       return state;
//   }
// }

// export default function SelectTravelDates({ register, setValue, color }) {
//   const [state, dispatch] = useReducer(dateReducer, initialState);

//   console.log("init", initialState.travelDates);

//   useEffect(() => {
//     dispatch({ type: "setStartDate", payload: initialState.travelDates.startDate });
//     dispatch({ type: "setEndDate", payload: initialState.travelDates.endDate });
//     dispatch({ type: "setAllDatesInRange", payload: [initialState.travelDates.startDate, initialState.travelDates.endDate] });
//     register("allDatesInRange", { value: state.allDatesInRange });
//   }, []);

//   useEffect(() => {
//     // Register the allDatesInRange field with react-hook-form
//     register("allDatesInRange", { value: state.allDatesInRange });
//   }, [register, state.allDatesInRange]);

//   useEffect(() => {
//     // Update the form value whenever allDatesInRange changes
//     setValue("allDatesInRange", state.allDatesInRange);
//   }, [state.allDatesInRange, setValue]);

//   return (
//     <div className={`flex justify-between items-center rounded-full border-${color} border px-3  bg-white w-full`}>
//       <Flatpickr
//         className={`p-2 bg-transparent w-full font-semibold text-${color}`}
//         options={{
//           mode: "range", // Enable range selection
//           minDate: initialState.travelDates.startDate, // Disable dates before today
//           dateFormat: "Y-m-d", // Set date format
//         }}
//         value={[state.startDate, state.endDate]}
//         onChange={(selectedDates) => {
//           // Handle start and end date changes
//           dispatch({ type: "setTravelDates", payload: selectedDates });
//           dispatch({ type: "setAllDatesInRange", payload: selectedDates });
//         }}
//       />
//       {/* Hidden inputs for react-hook-form */}
//       <CiCalendar className={`text-2xl text-${color}`} />
//       <input type="hidden" {...register("allDatesInRange")} />
//     </div>
//   );
// }
