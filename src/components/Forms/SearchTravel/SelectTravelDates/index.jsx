import { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CiCalendar } from "react-icons/ci";
import "flatpickr/dist/themes/material_green.css";
import { useSearchStore } from "../../../../stores";
import getFormattedDate from "../../../../utils/dateUtils/formayDateForFlatpickr.js";
import generateAllTravelDates from "../../../../utils/dateUtils/generateAllDatesArr.js";

// how can i make the preset dates update automatically if the day changes while the user is searching?
export default function SelectTravelDates({ toggleDatesFunc = () => {}, color, editDates = true }) {
  const { travelSearchData, setTravelDates, setAllDatesArr } = useSearchStore();
  const [defaultDateString, setDefaultDateString] = useState("");

  const todayString = getFormattedDate(new Date());
  const tomorrowString = getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  useEffect(() => {
    const updateDatesIfPast = () => {
      const { startDate, endDate } = travelSearchData.travelDates || {};

      // Determine if dates are in the past or if endDate is today
      const startDateInPast = startDate && new Date(startDate) < new Date(todayString);
      const endDateInPast = endDate && new Date(endDate) < new Date(todayString);
      const endDateIsToday = endDate && new Date(endDate).toDateString() === new Date(todayString).toDateString();

      if (startDateInPast && endDateInPast) {
        // Both startDate and endDate are in the past, set to today and tomorrow
        setTravelDates({ startDate: todayString, endDate: tomorrowString });
        setAllDatesArr(generateAllTravelDates(todayString, tomorrowString));
        setDefaultDateString(`${todayString} to ${tomorrowString}`);
      }
      if (startDateInPast) {
        // Only startDate is in the past, update to today
        const newEndDate = endDateIsToday ? tomorrowString : endDate;
        setTravelDates({ startDate: todayString, endDate: newEndDate });
        setAllDatesArr(generateAllTravelDates(todayString, newEndDate));
        setDefaultDateString(`${todayString} to ${newEndDate}`);
      }
      if (endDateIsToday) {
        // Only startDate is in the past, update to today
        const newEndDate = endDateIsToday ? tomorrowString : endDate;
        setTravelDates({ endDate: newEndDate });
        setAllDatesArr(generateAllTravelDates(startDate, newEndDate));
        setDefaultDateString(`${startDate} to ${newEndDate}`);
      } else {
        // No dates are in the past, set default date string
        setDefaultDateString(`${startDate} to ${endDate}`);
      }
    };

    // Initial check on component mount/reload
    if (!travelSearchData.travelDates || Object.keys(travelSearchData.travelDates).length === 0) {
      // Set initial date range if empty
      setTravelDates({ startDate: todayString, endDate: tomorrowString });
      setAllDatesArr(generateAllTravelDates(todayString, tomorrowString));
      setDefaultDateString(`${todayString} to ${tomorrowString}`);
    } else {
      updateDatesIfPast();
    }

    // Set up interval to check for past dates every 10 minutes
    const interval = setInterval(updateDatesIfPast, 10 * 60 * 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [travelSearchData]); // Dependency array left empty for initial mount/reload behavior

  return (
    <div className={`flex justify-between items-center rounded-full border-${color} border bg-white w-full transition-max-height duration-500 ease-in-out overflow-hidden  ${editDates ? "px-3 max-w-full opacity-100" : "px-0 max-w-0 opacity-0"}`}>
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
