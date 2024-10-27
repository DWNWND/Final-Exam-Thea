import { useReducer, useEffect } from "react";

const initialState = {
  startDate: "",
  endDate: "",
};

function calculateNextDay(dateStr) {
  const date = new Date(`${dateStr}T00:00:00`);
  console.log("first date", date);
  date.setDate(date.getDate() + 1);
  const nextDay = date.toISOString().split("T")[0];
  console.log("date", date);
  console.log("nextDay", nextDay);
  return nextDay;
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
    default:
      return state;
  }
}

export default function SelectTravelDates({ register }) {
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1; // the months are indexed starting with 0
  let date = today.getDate();

  const startDateStr = `${year}-${month}-${date}`;
  const initialEndDate = calculateNextDay(startDateStr);

  const [state, dispatch] = useReducer(dateReducer, {
    startDate: startDateStr,
    endDate: initialEndDate,
  });

  useEffect(() => {
    dispatch({ type: "setStartDate", payload: state.startDate });
  }, [state.startDate]);

  return (
    <div>
      <input {...register("startDate")} type="date" id="start" name="startDate" min={startDateStr} value={state.startDate} onChange={(e) => dispatch({ type: "setStartDate", payload: e.target.value })} />
      <input
        {...register("endDate")}
        type="date"
        id="end"
        name="endDate"
        min={state.startDate} // Ensure end date cannot be before start date
        value={state.endDate}
        onChange={(e) => dispatch({ type: "setEndDate", payload: e.target.value })}
      />
    </div>
  );
}

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
