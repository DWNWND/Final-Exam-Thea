import { useReducer, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CiCalendar } from "react-icons/ci";
import "flatpickr/dist/themes/material_green.css";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const initialState = {
  dateRange: { startDate: today, endDate: tomorrow }, // Store start and end date
  allDatesInRange: [], // Store all dates in the range
};

// Format dates to "Y-m-d" for Flatpickr
function formatDateString(date) {
  const newDate = new Date(date);
  return newDate.toISOString().split("T")[0]; // Formats to "YYYY-MM-DD"
}

// Helper to generate date range array
function generateDateRange(start, end) {
  const dateArray = [];
  let currentDate = new Date(start);
  while (currentDate <= end) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
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
        dateRange: { startDate: action.payload[0], endDate: action.payload[1] },
        allDatesInRange: generateDateRange(action.payload[0], action.payload[1]),
      };
    default:
      return state;
  }
}

export default function SelectTravelDates({ register, setValue, color, formData }) {
  const [state, dispatch] = useReducer(dateReducer, initialState);

  useEffect(() => {
    // dispatch({ type: "setStartDate", payload: initialState.dateRange.startDate });
    // dispatch({ type: "setEndDate", payload: initialState.dateRange.endDate });

    // Set initial date range and allDatesInRange in react-hook-form
    setValue("allDatesInRange", state.allDatesInRange);
    register("allDatesInRange", { value: state.allDatesInRange });
  }, [register, setValue]);

  useEffect(() => {
    // Update form value whenever allDatesInRange changes
    setValue("allDatesInRange", state.allDatesInRange);
  }, [state.allDatesInRange, setValue]);

  let defaultDateString;

  if (formData && formData.allDatesInRange.length > 0) {
    defaultDateString = `${formatDateString(formData.allDatesInRange[0])} to ${formatDateString(formData.allDatesInRange.at(-1))}`;
    console.log("defaultDateString", defaultDateString);
  } else {
    defaultDateString = [state.dateRange.startDate, state.dateRange.endDate];
    console.log("defaultDateString22", defaultDateString);
  }

  console.log("defaultDateStringxx", defaultDateString);

  return (
    <div className={`flex justify-between items-center rounded-full border-${color} border px-3 bg-white w-full`}>
      <Flatpickr
        className={`p-2 bg-transparent w-full font-semibold text-${color}`}
        options={{
          mode: "range",
          minDate: today, // Disable dates before today
          dateFormat: "Y-m-d",
          defaultDate: defaultDateString,
        }}
        onChange={(selectedDates) => {
          if (selectedDates.length === 2) {
            // Only dispatch if both start and end dates are selected
            dispatch({ type: "setDateRange", payload: selectedDates });
          }
        }}
      />
      <CiCalendar className={`text-2xl text-${color}`} />
      <input type="hidden" {...register("allDatesInRange")} />
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
