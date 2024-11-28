import { useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import { CiCalendar } from "react-icons/ci";
import { useTravelDatesStore } from "../../../../../stores";
import { formatDateForDisplay, formatDateForFlatpickr, generateAllDatesArr } from "../../../../../utils";

interface SelectTravelDatesProps {
  toggleDatesFunc?: () => void;
  color: string;
  editDates?: boolean;
}

export function SelectTravelDates({ toggleDatesFunc = () => {}, color, editDates = true }: SelectTravelDatesProps) {
  const { savedDates, setSavedDates, initialDates, setInitialDates, defaultFlatpickrDates, setDefaultFlatpickrDates } = useTravelDatesStore();

  const today = new Date();
  const todayString = formatDateForFlatpickr(today);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const initializeDates = () => {
      const startYYYYMMDD = formatDateForFlatpickr(today);
      const endYYYYMMDD = formatDateForFlatpickr(tomorrow);
      const dateRangeArrYYYYMMDD = generateAllDatesArr(startYYYYMMDD, endYYYYMMDD);
      const startDisplay = formatDateForDisplay(today);
      const endDisplay = formatDateForDisplay(tomorrow);

      setSavedDates({
        endYYYYMMDD: endYYYYMMDD,
        startYYYYMMDD: startYYYYMMDD,
        endDisplay: endDisplay,
        startDisplay: startDisplay,
        endDateObj: tomorrow,
        startDateObj: today,
        dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
      });

      setInitialDates({
        todayDateObj: today,
        tomorrowDateObj: tomorrow,
      });
      setDefaultFlatpickrDates(`${startYYYYMMDD} to ${endYYYYMMDD}`);
    };

    const updateDatesIfPast = () => {
      const stripTime = (date: string | Date): Date => {
        const parsedDate = typeof date === "string" ? new Date(date) : date;
        parsedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
        return parsedDate;
      };

      const startDateObj = savedDates.startDateObj ? stripTime(savedDates.startDateObj) : null;
      const endDateObj = savedDates.endDateObj ? stripTime(savedDates.endDateObj) : null;

      const startDateInPast = startDateObj && startDateObj < stripTime(today);
      const endDateInPast = endDateObj && startDateObj && endDateObj < startDateObj;
      const endDateIsSameAsStartDate = endDateObj && startDateObj && endDateObj.getTime() === startDateObj.getTime();

      if (endDateInPast) {
        initializeDates();
      }

      if (startDateInPast) {
        const newStartDate = startDateInPast ? today : startDateObj;
        const newStartDateIsSameAsEndDate = newStartDate && newStartDate === endDateObj;
        const newEndDate = newStartDateIsSameAsEndDate ? new Date(newStartDate.setDate(newStartDate.getDate() + 1)) : savedDates.endDateObj;
        const endYYYYMMDD = formatDateForFlatpickr(newEndDate);
        const startYYYYMMDD = formatDateForFlatpickr(newStartDate);
        const endDisplay = formatDateForDisplay(newEndDate);
        const startDisplay = formatDateForDisplay(newStartDate);
        const dateRangeArrYYYYMMDD = generateAllDatesArr(startYYYYMMDD, endYYYYMMDD);
        setSavedDates({
          endYYYYMMDD: endYYYYMMDD,
          startYYYYMMDD: startYYYYMMDD,
          endDateObj: newEndDate,
          startDateObj: newStartDate,
          endDisplay: endDisplay,
          startDisplay: startDisplay,
          dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
        });
        setDefaultFlatpickrDates(`${startYYYYMMDD} to ${endYYYYMMDD}`);
      }

      if (endDateIsSameAsStartDate) {
        const newEndDate = new Date(startDateObj.getTime() + 24 * 60 * 60 * 1000);
        const endYYYYMMDD = formatDateForFlatpickr(newEndDate);
        const dateRangeArrYYYYMMDD = generateAllDatesArr(savedDates.startYYYYMMDD, endYYYYMMDD);
        const endDisplay = formatDateForDisplay(newEndDate);

        setSavedDates({
          endYYYYMMDD: endYYYYMMDD,
          endDateObj: newEndDate,
          endDisplay: endDisplay,
          startDateObj: savedDates.startDateObj,
          startYYYYMMDD: savedDates.startYYYYMMDD,
          startDisplay: savedDates.startDisplay,
          dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
        });
        setDefaultFlatpickrDates(`${savedDates.startYYYYMMDD} to ${endYYYYMMDD}`);
      } else {
        setDefaultFlatpickrDates(`${savedDates.startYYYYMMDD} to ${savedDates.endYYYYMMDD}`);
      }
    };

    if (!savedDates || !savedDates.endYYYYMMDD || !savedDates.startYYYYMMDD) {
      initializeDates();
    } else {
      updateDatesIfPast();
    }

    const interval = setInterval(updateDatesIfPast, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [initialDates]);

  return (
    <div className={`flex justify-between items-center rounded-full border-${color} border bg-white w-full transition-max-height duration-500 ease-in-out overflow-hidden ${editDates ? "px-3 max-w-full opacity-100" : "px-0 max-w-0 opacity-0"}`}>
      {defaultFlatpickrDates && savedDates.startYYYYMMDD && savedDates.endYYYYMMDD && (
        <>
          <Flatpickr
            className={`p-2 bg-transparent w-full font-semibold text-${color}`}
            options={{
              mode: "range",
              minDate: todayString,
              dateFormat: "Y-m-d",
              defaultDate: defaultFlatpickrDates,
            }}
            onChange={(selectedDates: Date[]) => {
              if (selectedDates.length === 2) {
                const [start, end] = selectedDates;
                const selectedStartDate = formatDateForFlatpickr(start);
                const selectedEndDate = formatDateForFlatpickr(end);

                setSavedDates({
                  startDateObj: start,
                  endDateObj: end,
                  startYYYYMMDD: selectedStartDate,
                  endYYYYMMDD: selectedEndDate,
                  startDisplay: formatDateForDisplay(start),
                  endDisplay: formatDateForDisplay(end),
                  dateRangeArrYYYYMMDD: generateAllDatesArr(selectedStartDate, selectedEndDate),
                });

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