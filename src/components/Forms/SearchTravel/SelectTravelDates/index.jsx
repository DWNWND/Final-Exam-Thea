import { useReducer, useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CiCalendar } from "react-icons/ci";
import "flatpickr/dist/themes/material_green.css";
import { useSearchStore } from "../../../../stores/useSearchStore.js";
import getFormattedDate from "../../../../utils/dateUtils/formayDateForFlatpickr.js";
import generateAllTravelDates from "../../../../utils/dateUtils/generateAllDatesArr.js";

// how can i make the preset dates update automatically if the day changes while the user is searching?
export default function SelectTravelDates({ toggleDatesFunc = () => {}, color, tailw }) {
  const { travelSearchData, setTravelDates, setAllDatesArr } = useSearchStore();
  const [defaultDateString, setDefaultDateString] = useState("");

  const todayString = getFormattedDate(new Date());
  const tomorrowString = getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  useEffect(() => {
    if (!travelSearchData.travelDates || Object.keys(travelSearchData.travelDates).length === 0) {
      // Set initial date range if empty
      setTravelDates({ startDate: todayString, endDate: tomorrowString });
      setAllDatesArr(generateAllTravelDates(todayString, tomorrowString));

      setDefaultDateString(`${todayString} to ${tomorrowString}`);
    } else {
      setDefaultDateString(`${travelSearchData.travelDates.startDate} to ${travelSearchData.travelDates.endDate}`);
    }

    // Set up an interval to check for a date change every minute
    const interval = setInterval(() => {
      const newTodayString = todayString;
      const newTomorrowString = tomorrowString;

      // If the day has changed, update the dates in the store and defaultDateString
      if (newTodayString !== todayString) {
        setTravelDates({ startDate: newTodayString, endDate: newTomorrowString });
        setAllDatesArr(generateAllTravelDates(newTodayString, newTomorrowString));
        setDefaultDateString(`${newTodayString} to ${newTomorrowString}`);
      }
    }, 10 * 60 * 1000); // Check every 10 minutes

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [travelSearchData.travelDates, setTravelDates, setAllDatesArr]);

  return (
    <div className={`${tailw} px-3 flex justify-between items-center rounded-full border-${color} border bg-white w-full`}>
      {defaultDateString && travelSearchData.travelDates && travelSearchData.travelDates.startDate && travelSearchData.travelDates.endDate && (
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
                // Call toggleDatesFunc if it's defined
                if (toggleDatesFunc) {
                  toggleDatesFunc();
                }
              }
            }}
          />
          <CiCalendar className={`text-2xl text-${color}`} />
        </>
      )}
    </div>
  );
}
