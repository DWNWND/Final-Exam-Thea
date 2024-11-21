import { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CiCalendar } from "react-icons/ci";
import "flatpickr/dist/themes/material_green.css";
import getFormattedDate from "../../../../utils/dateUtils/formatDateForFlatpickr.js";
import generateAllTravelDates from "../../../../utils/dateUtils/generateAllDatesArr.js";
import { useTravelDatesStore } from "../../../../stores";
import formatDateForDisplay from "../../../../utils/dateUtils/formatDateForDisplay.js";

export default function SelectTravelDates({ toggleDatesFunc = () => {}, color, editDates = true }) {
  const { savedDates, initialDates, setSavedDates, defaultFlatpickrDates } = useTravelDatesStore();

  const todayString = getFormattedDate(initialDates.todayDateObj);

  return (
    <div className={`flex justify-between items-center rounded-full border-${color} border bg-white w-full transition-max-height duration-500 ease-in-out overflow-hidden  ${editDates ? "px-3 max-w-full opacity-100" : "px-0 max-w-0 opacity-0"}`}>
      {defaultFlatpickrDates && savedDates && savedDates.startYYYYMMDD && savedDates.endYYYYMMDD && (
        <>
          <Flatpickr
            className={`p-2 bg-transparent w-full font-semibold text-${color}`}
            options={{
              mode: "range",
              minDate: todayString, // Disable dates before today
              dateFormat: "Y-m-d",
              defaultDate: defaultFlatpickrDates,
            }}
            onChange={(selectedDates) => {
              if (selectedDates.length === 2) {
                const selectedStartDate = getFormattedDate(selectedDates[0]);
                const selectedEndDate = getFormattedDate(selectedDates[1]);

                setSavedDates({
                  startDateObj: selectedDates[0],
                  endDateObj: selectedDates[1],
                  startYYYYMMDD: selectedStartDate,
                  endYYYYMMDD: selectedEndDate,
                  startDisplay: formatDateForDisplay(selectedDates[0]),
                  endDisplay: formatDateForDisplay(selectedDates[1]),
                  dateRangeArrYYYYMMDD: generateAllTravelDates(selectedStartDate, selectedEndDate),
                });

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
