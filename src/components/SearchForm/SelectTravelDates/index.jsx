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

// const today = normalizeDateToUTC(new Date());
// const tomorrow = normalizeDateToUTC(new Date(today));
// tomorrow.setUTCDate(today.getUTCDate() + 1);

// const today = new Date();
// const tomorrow = new Date(today);
// tomorrow.setDate(today.getDate() + 1);

const initialState = {
  dateRange: { startDate: todayString, endDate: tomorrowString }, // Store start and end date
};

// const initialState = {
//   dateRange: { startDate: today, endDate: tomorrow }, // Store start and end date
//   // allDatesInRange: [], // Store all dates in the range
// };

console.log("initialState", initialState.dateRange);

// Format dates to "YYYY-MM-DD" without timezone shifts
// function formatDateString(date) {
//   const newDate = new Date(date);
//   return newDate.toISOString().split("T")[0]; // Formats to "YYYY-MM-DD"
// }

// Utility to calculate all dates between start and end
function generateDateRange(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split("T")[0]); // Push date as "YYYY-MM-DD"
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return dates;
}

function dateReducer(state, action) {
  switch (action.type) {
    case "setStartDate":
      return {
        ...state,
        startDate: action.payload,
        endDate: state.endDate <= action.payload ? calculateNextDay(action.payload) : state.endDate,
      };
    case "setEndDate":
      return {
        ...state,
        endDate: action.payload,
      };
    case "setDateRange":
      return {
        ...state,
        dateRange: { startDate: getFormattedDate(action.payload[0]), endDate: getFormattedDate(action.payload[1]) },
      };
    case "setAllDatesInRange":
      const [start, end] = action.payload;
      return {
        ...state,
        dateRange: action.payload,
        allDatesInRange: start && end ? generateDateRange(start, end) : [], // Generate all dates if both start and end are selected
      };
    default:
      return state;
  }
}

export default function SelectTravelDates({ register, setValue, color }) {
  const [state, dispatch] = useReducer(dateReducer, initialState);
  const { setDateRange, setAllDatesRange, formData } = useSearchStore();

  useEffect(() => {
    // Update the form value whenever allDatesInRange changes
    setValue("allDatesInRange", state.allDatesInRange);
    setAllDatesRange(state.allDatesInRange);
  }, [state.allDatesInRange, setValue]);

  console.log("allDatesInRange", state.allDatesInRange);

  useEffect(() => {
    setValue("dateRange", state.dateRange);
  }, [state.dateRange]);

  console.log("formData", formData);

  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
  }

  useEffect(() => {
    if (isEmpty(formData.dateRange)) {
      setDateRange(initialState.dateRange);
    }
  }, []);

  const defaultDateString = `${formData.dateRange.startDate} to ${formData.dateRange.endDate}`;

  return (
    <div className={`flex justify-between items-center rounded-full border-${color} border px-3 bg-white w-full`}>
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
            // Only dispatch if both start and end dates are selected
            const start = getFormattedDate(selectedDates[0]);
            const end = getFormattedDate(selectedDates[1]);
            dispatch({ type: "setDateRange", payload: selectedDates });
            setDateRange({ startDate: start, endDate: end });

            dispatch({ type: "setAllDatesInRange", payload: selectedDates });
            // setValue("dateRange", { startDate: start, endDate: end });
          }
        }}
      />
      <CiCalendar className={`text-2xl text-${color}`} />
      <input type="hidden" />
    </div>
  );
}

// import { useReducer, useEffect } from "react";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { CiCalendar } from "react-icons/ci";
// import "flatpickr/dist/themes/material_green.css";

// const today = new Date();
// const tomorrow = new Date(today);
// tomorrow.setDate(today.getDate() + 1);

// const initialState = {
//   dateRange: { startDate: today, endDate: tomorrow }, // Store both start and end date in an array
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
//     case "setDateRange":
//       return {
//         ...state,
//         startDate: action.payload[0] || "",
//         endDate: action.payload[1] || "",
//       };
//     case "setAllDatesInRange":
//       const [start, end] = action.payload;
//       return {
//         ...state,
//         dateRange: action.payload,
//         // allDatesInRange: start && end ? generateDateRange(start, end) : [], // Generate all dates if both start and end are selected
//       };
//     default:
//       return state;
//   }
// }

// export default function SelectTravelDates({ register, setValue, color }) {
//   const [state, dispatch] = useReducer(dateReducer, initialState);

//   console.log("init", initialState.dateRange);

//   useEffect(() => {
//     dispatch({ type: "setStartDate", payload: initialState.dateRange.startDate });
//     dispatch({ type: "setEndDate", payload: initialState.dateRange.endDate });
//     dispatch({ type: "setAllDatesInRange", payload: [initialState.dateRange.startDate, initialState.dateRange.endDate] });
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
//           minDate: initialState.dateRange.startDate, // Disable dates before today
//           dateFormat: "Y-m-d", // Set date format
//         }}
//         value={[state.startDate, state.endDate]}
//         onChange={(selectedDates) => {
//           // Handle start and end date changes
//           dispatch({ type: "setDateRange", payload: selectedDates });
//           dispatch({ type: "setAllDatesInRange", payload: selectedDates });
//         }}
//       />
//       {/* Hidden inputs for react-hook-form */}
//       <CiCalendar className={`text-2xl text-${color}`} />
//       <input type="hidden" {...register("allDatesInRange")} />
//     </div>
//   );
// }
