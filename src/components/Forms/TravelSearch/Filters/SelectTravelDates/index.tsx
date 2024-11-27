import { useEffect } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { CiCalendar } from "react-icons/ci";
import "flatpickr/dist/themes/material_green.css";
import { useTravelDatesStore } from "../../../../../stores";
import { formatDateForDisplay, formatDateForFlatpickr, generateAllDatesArr } from "../../../../../utils";

// Define the type for props
interface SelectTravelDatesProps {
  toggleDatesFunc?: () => void;
  color: string;
  editDates?: boolean;
}

export default function SelectTravelDates({ toggleDatesFunc = () => {}, color, editDates = true }: SelectTravelDatesProps) {
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
        endYYYYMMDD,
        startYYYYMMDD,
        endDisplay,
        startDisplay,
        endDateObj: tomorrow,
        startDateObj: today,
        dateRangeArrYYYYMMDD,
      });

      setInitialDates({
        todayDateObj: today,
        tomorrowDateObj: tomorrow,
      });
      setDefaultFlatpickrDates(`${startYYYYMMDD} to ${endYYYYMMDD}`);
    };

    const updateDatesIfPast = () => {
      const stripTime = (date: Date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0); // Set time to 00:00:00
        return d;
      };

      const startDateInPast = savedDates.startDateObj && stripTime(savedDates.startDateObj) < stripTime(today);
      const endDateInPast = savedDates.endDateObj && stripTime(savedDates.endDateObj) < stripTime(savedDates.startDateObj);
      const endDateIsSameAsStartDate = savedDates.endDateObj && stripTime(savedDates.endDateObj).getTime() === stripTime(savedDates.startDateObj).getTime();

      if (endDateInPast) {
        initializeDates();
      }

      if (startDateInPast) {
        const newStartDate = today;
        const newStartDateIsSameAsEndDate = savedDates.endDateObj && savedDates.endDateObj === newStartDate;
        const newEndDate = newStartDateIsSameAsEndDate ? new Date(newStartDate.getTime() + 24 * 60 * 60 * 1000) : savedDates.endDateObj;

        const startYYYYMMDD = formatDateForFlatpickr(newStartDate);
        const endYYYYMMDD = formatDateForFlatpickr(newEndDate!);
        const startDisplay = formatDateForDisplay(newStartDate);
        const endDisplay = formatDateForDisplay(newEndDate!);
        const dateRangeArrYYYYMMDD = generateAllDatesArr(startYYYYMMDD, endYYYYMMDD);

        setSavedDates({
          startDateObj: newStartDate,
          endDateObj: newEndDate!,
          startYYYYMMDD,
          endYYYYMMDD,
          startDisplay,
          endDisplay,
          dateRangeArrYYYYMMDD,
        });
        setDefaultFlatpickrDates(`${startYYYYMMDD} to ${endYYYYMMDD}`);
      }

      if (endDateIsSameAsStartDate) {
        const newEndDate = new Date(savedDates.startDateObj!.getTime() + 24 * 60 * 60 * 1000);
        const endYYYYMMDD = formatDateForFlatpickr(newEndDate);
        const dateRangeArrYYYYMMDD = generateAllDatesArr(savedDates.startYYYYMMDD, endYYYYMMDD);
        const endDisplay = formatDateForDisplay(newEndDate);

        setSavedDates({
          ...savedDates,
          endDateObj: newEndDate,
          endYYYYMMDD,
          endDisplay,
          dateRangeArrYYYYMMDD,
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

// import { useEffect } from "react";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { CiCalendar } from "react-icons/ci";
// import "flatpickr/dist/themes/material_green.css";
// import { useTravelDatesStore } from "../../../../../stores";
// import { formatDateForDisplay, formatDateForFlatpickr, generateAllDatesArr } from "../../../../../utils";

// export default function SelectTravelDates({ toggleDatesFunc = () => {}, color, editDates = true }) {
//   const { savedDates, setSavedDates, initialDates, setInitialDates, defaultFlatpickrDates, setDefaultFlatpickrDates } = useTravelDatesStore();

//   const today = new Date();
//   const todayString = formatDateForFlatpickr(today);

//   useEffect(() => {
//     const tomorrow = new Date();
//     tomorrow.setDate(today.getDate() + 1);

//     const initializeDates = () => {
//       // Set date store if its not set yet
//       const startYYYYMMDD = formatDateForFlatpickr(today);
//       const endYYYYMMDD = formatDateForFlatpickr(tomorrow);
//       const dateRangeArrYYYYMMDD = generateAllDatesArr(startYYYYMMDD, endYYYYMMDD);
//       const startDisplay = formatDateForDisplay(today); //for display
//       const endDisplay = formatDateForDisplay(tomorrow); //for display

//       setSavedDates({
//         endYYYYMMDD: endYYYYMMDD,
//         startYYYYMMDD: startYYYYMMDD,
//         endDisplay: endDisplay,
//         startDisplay: startDisplay,
//         endDateObj: tomorrow,
//         startDateObj: today,
//         dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
//       });

//       //force a reload of the logic
//       setInitialDates({
//         todayDateObj: today,
//         tomorrowDateObj: tomorrow,
//       });
//       setDefaultFlatpickrDates(`${startYYYYMMDD} to ${endYYYYMMDD}`);
//     };
//     const updateDatesIfPast = () => {
//       const stripTime = (date) => {
//         const d = new Date(date);
//         d.setHours(0, 0, 0, 0); // Set time to 00:00:00
//         return d;
//       };

//       // Determine if dates are in the past or if endDate is same as startDate
//       const startDateInPast = savedDates.startDateObj && stripTime(savedDates.startDateObj) < stripTime(today);
//       const endDateInPast = savedDates.endDateObj && stripTime(savedDates.endDateObj) < stripTime(savedDates.startDateObj);
//       const endDateIsSameAsStartDate = savedDates.endDateObj && stripTime(savedDates.endDateObj).getTime() === stripTime(savedDates.startDateObj).getTime();

//       if (endDateInPast) {
//         // endDate is in the past (all dates must be invalid)
//         initializeDates();
//       }
//       if (startDateInPast) {
//         //startDate is in the past (update startDate AND update endDate if it's the same as the new startDate)
//         const newStartDate = startDateInPast ? today : savedDates.startDateObj;
//         const newStartDateIsSameAsEndDate = newStartDate && newStartDate === savedDates.endDateObj;
//         const newEndDate = newStartDateIsSameAsEndDate ? new Date(newStartDate.setDate(newStartDate.getDate() + 1)) : savedDates.endDateObj;
//         const endYYYYMMDD = formatDateForFlatpickr(newEndDate);
//         const startYYYYMMDD = formatDateForFlatpickr(newStartDate);
//         const endDisplay = formatDateForDisplay(newEndDate); //for display
//         const startDisplay = formatDateForDisplay(newStartDate); //for display
//         const dateRangeArrYYYYMMDD = generateAllDatesArr(startYYYYMMDD, endYYYYMMDD);
//         setSavedDates({
//           endYYYYMMDD: endYYYYMMDD,
//           startYYYYMMDD: startYYYYMMDD,
//           endDateObj: newEndDate,
//           startDateObj: newStartDate,
//           endDisplay: endDisplay,
//           startDisplay: startDisplay,
//           dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
//         });
//         setDefaultFlatpickrDates(`${startYYYYMMDD} to ${endYYYYMMDD}`);
//       }
//       if (endDateIsSameAsStartDate) {
//         // endDate and startDate is the same (if there has been a glitch and the dates are the same, update endDate to the next day)
//         const newEndDate = new Date(new Date(savedDates.startDateObj).setDate(new Date(savedDates.startDateObj).getDate() + 1));
//         const endYYYYMMDD = formatDateForFlatpickr(newEndDate);
//         const dateRangeArrYYYYMMDD = generateAllDatesArr(savedDates.startYYYYMMDD, endYYYYMMDD);
//         const endDisplay = formatDateForDisplay(newEndDate); //for display
//         setSavedDates({
//           endYYYYMMDD: endYYYYMMDD,
//           endDateObj: newEndDate,
//           endDisplay: endDisplay,
//           startDateObj: savedDates.startDateObj,
//           startYYYYMMDD: savedDates.startYYYYMMDD,
//           startDisplay: savedDates.startDisplay,
//           dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
//         });
//         setDefaultFlatpickrDates(`${savedDates.startYYYYMMDD} to ${endYYYYMMDD}`);
//       } else {
//         // No dates are wrong, set default date string for display
//         setDefaultFlatpickrDates(`${savedDates.startYYYYMMDD} to ${savedDates.endYYYYMMDD}`);
//       }
//     };
//     // Check on component mount/reload (if no dates are saved, initialize them, if they are saved, check if they are correct)
//     if (!savedDates || !savedDates.endYYYYMMDD || !savedDates.startYYYYMMDD) {
//       initializeDates();
//     } else if (savedDates && savedDates.endYYYYMMDD) {
//       updateDatesIfPast();
//     }
//     // Set up interval to check for past dates every 10 minutes
//     const interval = setInterval(updateDatesIfPast, 10 * 60 * 1000);
//     // Clear the interval on component unmount
//     return () => clearInterval(interval);
//   }, [initialDates]); // Dependency array left empty for initial mount/reload behavior

//   return (
//     <div className={`flex justify-between items-center rounded-full border-${color} border bg-white w-full transition-max-height duration-500 ease-in-out overflow-hidden  ${editDates ? "px-3 max-w-full opacity-100" : "px-0 max-w-0 opacity-0"}`}>
//       {defaultFlatpickrDates && savedDates && savedDates.startYYYYMMDD && savedDates.endYYYYMMDD && (
//         <>
//           <Flatpickr
//             className={`p-2 bg-transparent w-full font-semibold text-${color}`}
//             options={{
//               mode: "range",
//               minDate: todayString, // Disable dates before today
//               dateFormat: "Y-m-d",
//               defaultDate: defaultFlatpickrDates,
//             }}
//             onChange={(selectedDates) => {
//               if (selectedDates.length === 2) {
//                 const selectedStartDate = formatDateForFlatpickr(selectedDates[0]);
//                 const selectedEndDate = formatDateForFlatpickr(selectedDates[1]);

//                 setSavedDates({
//                   startDateObj: selectedDates[0],
//                   endDateObj: selectedDates[1],
//                   startYYYYMMDD: selectedStartDate,
//                   endYYYYMMDD: selectedEndDate,
//                   startDisplay: formatDateForDisplay(selectedDates[0]),
//                   endDisplay: formatDateForDisplay(selectedDates[1]),
//                   dateRangeArrYYYYMMDD: generateAllDatesArr(selectedStartDate, selectedEndDate),
//                 });

//                 if (toggleDatesFunc) {
//                   toggleDatesFunc();
//                 }
//               }
//             }}
//           />
//           <CiCalendar className={`text-2xl text-${color}`} />
//         </>
//       )}
//     </div>
//   );
// }