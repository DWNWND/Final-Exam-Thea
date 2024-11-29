// https://www.npmjs.com/package/@demark-pro/react-booking-calendar
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { useSearchStore } from "../../stores/useSearchStore.js";

export default function BookingCalendar({ reserved }) {
  const { travelSearchData } = useSearchStore();

  let requestedDates = [travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate];
  return (
    <Calendar
      classNames={{
        CalendarContainer: "bg-white rounded-lg p-6 w-full",
        DayReservation: "bg-comp-gray",
        WeekContent: "text-primary-blue",
        MonthContent: "text-primary-blue",
        DayContent: "text-primary-blue",
        MonthArrowNext: "text-primary-blue",
        MonthArrowPrev: "text-primary-blue",
        DayToday: "border-none",
        DaySelection: "border border-primary-blue bg-transparent",
      }}
      selected={requestedDates}
      reserved={reserved}
    />
  );
}
