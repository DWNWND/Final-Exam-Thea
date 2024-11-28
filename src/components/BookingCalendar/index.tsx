// https://www.npmjs.com/package/@demark-pro/react-booking-calendar
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { useTravelDatesStore } from "../../stores";
import { DateRange } from "../../types";

interface BookingCalendarProps {
  reserved: DateRange[];
}

export default function BookingCalendar({ reserved }: BookingCalendarProps): JSX.Element {
  const { savedDates } = useTravelDatesStore();

  const requestedDates = [savedDates.startYYYYMMDD, savedDates.endYYYYMMDD];

  return (
    <Calendar
      classNames={{
        CalendarContainer: "bg-white rounded-lg p-6 w-full",
        DayReservation: "bg-comp-gray",
        WeekContent: "text-primary-blue",
        MonthContent: "text-primary-blue",
        DayContent: "text-primary-blue",
        MonthArrowNext: "text-primary-blue",
        DayToday: "border-none",
        DaySelection: "border border-primary-blue bg-transparent",
      }}
      selected={requestedDates}
      reserved={reserved}
    />
  );
}
