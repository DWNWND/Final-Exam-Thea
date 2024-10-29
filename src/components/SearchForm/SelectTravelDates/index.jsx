import { useReducer, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CiCalendar } from "react-icons/ci";
import 'flatpickr/dist/themes/material_green.css';


const initialState = {
  dateRange: [null, null], // Store both start and end date in an array
  allDatesInRange: [], // Store all dates in the range
};

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

function calculateNextDay(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + 1));
  return date.toISOString().split("T")[0];
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
        startDate: action.payload[0] || "",
        endDate: action.payload[1] || "",
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

export default function SelectTravelDates({ register, setValue }) {
  const [state, dispatch] = useReducer(dateReducer, initialState);

  // Initialize with today's date as start date
  const today = new Date();
  const startDateStr = today.toISOString().split("T")[0];
  const initialEndDate = calculateNextDay(startDateStr);

  useEffect(() => {
    dispatch({ type: "setStartDate", payload: startDateStr });
    dispatch({ type: "setEndDate", payload: initialEndDate });
    dispatch({ type: "setAllDatesInRange", payload: [startDateStr, initialEndDate] });
  }, [startDateStr, initialEndDate]);

  useEffect(() => {
    // Register the allDatesInRange field with react-hook-form
    register("allDatesInRange", { value: state.allDatesInRange });
  }, [register, state.allDatesInRange]);

  useEffect(() => {
    // Update the form value whenever allDatesInRange changes
    setValue("allDatesInRange", state.allDatesInRange);
  }, [state.allDatesInRange, setValue]);

  return (
    <div className="flex justify-between items-center rounded-full border-primary-green border px-3  bg-white w-full">
      <Flatpickr
        className="p-2 bg-transparent w-full italic text-primary-green placeholder:text-primary-light"
        options={{
          mode: "range", // Enable range selection
          minDate: startDateStr, // Disable dates before today
          dateFormat: "Y-m-d", // Set date format
        }}
        value={[state.startDate, state.endDate]}
        onChange={(selectedDates) => {
          // Handle start and end date changes
          dispatch({ type: "setDateRange", payload: selectedDates });
          dispatch({ type: "setAllDatesInRange", payload: selectedDates });
        }}
      />
      {/* Hidden inputs for react-hook-form */}
      <CiCalendar className="text-2xl" />
      <input type="hidden" {...register("allDatesInRange")} />
    </div>
  );
}

//second try
// import { useReducer, useEffect, useState } from "react";
// import Flatpickr from "react-flatpickr";

// const initialState = {
//   startDate: "",
//   endDate: "",
// };

// function calculateNextDay(dateStr) {
//   const [year, month, day] = dateStr.split("-").map(Number);
//   const date = new Date(Date.UTC(year, month - 1, day + 1)); // Increment the day directly
//   const nextDay = date.toISOString().split("T")[0];
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
//     default:
//       return state;
//   }
// }

// export default function SelectTravelDates({ register }) {
//   const [dateRange, setDateRange] = useState([null, null]);

//   let today = new Date();

//   let year = today.getFullYear();
//   let month = today.getMonth() + 1; // the months are indexed starting with 0
//   let date = today.getDate();

//   const startDateStr = `${year}-${month}-${date}`;
//   const initialEndDate = calculateNextDay(startDateStr);

//   const [state, dispatch] = useReducer(dateReducer, {
//     startDate: startDateStr,
//     endDate: initialEndDate,
//   });

//   useEffect(() => {
//     dispatch({ type: "setStartDate", payload: state.startDate });
//   }, [state.startDate]);

//   return (
//     <div>
//       <input {...register("startDate")} type="date" id="start" name="startDate" min={startDateStr} value={state.startDate} onChange={(e) => dispatch({ type: "setStartDate", payload: e.target.value })} />
//       <input
//         {...register("endDate")}
//         type="date"
//         id="end"
//         name="endDate"
//         min={state.startDate} // Ensure end date cannot be before start date
//         value={state.endDate}
//         onChange={(e) => dispatch({ type: "setEndDate", payload: e.target.value })}
//       />
//     </div>
//   );
// }

//first try
// import { useState, useEffect } from "react";

// export default function SelectTravelDates({ register }) {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   let today = new Date();

//   let year = today.getFullYear();
//   let month = today.getMonth() + 1; // the months are indexed starting with 0
//   let date = today.getDate();

//   let startDateStr = `${year}-${month}-${date}`;
//   let endDateStr = `${year}-${month}-${date + 1}`;

//   function calculateNextDay(dateStr) {
//     const date = new Date(dateStr); // Convert string to Date object
//     date.setDate(date.getDate() + 1); // Increment the day by 1
//     console.log("date", date);
//     return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
//   }

//   useEffect(() => {
//     console.log("startDate", startDate);
//     if (startDate) {
//       setEndDate(calculateNextDay(startDate));
//     }
//     if (startDate && endDate <= startDate) {
//       setEndDate(calculateNextDay(startDate));
//     }
//     if (!startDate) {
//       setEndDate(endDateStr);
//     }
//   }, [, startDate]);

//   return (
//     <div>
//       <input {...register("startDate")} type="date" id="start" name="startDate" min={startDateStr} defaultValue={startDateStr} onChange={(e) => setStartDate(e.target.value)}></input>
//       <input {...register("endDate")} type="date" id="end" name="endDate" min={startDate} defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)}></input>
//     </div>
//   );
// }
