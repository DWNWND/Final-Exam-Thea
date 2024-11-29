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

export default function SelectTravelDates({ toggleDatesFunc, color, tailw }) {
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
    <div className={`${tailw} flex justify-between items-center rounded-full border-${color} border bg-white w-full`}>
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
                toggleDatesFunc();
              }
            }}
          />
          <CiCalendar className={`text-2xl text-${color}`} />
        </>
      )}
    </div>
  );
}
