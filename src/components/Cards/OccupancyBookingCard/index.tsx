import { formatDateForDisplay } from "../../../utils";
import { BookingsData } from "../../../types";

interface OccupancyBookingCardCompProps {
  booking: BookingsData;
  active?: boolean;
}

export function OccupancyBookingCard({ booking, active = true }: OccupancyBookingCardCompProps): JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-sm relative">
      {!active && <div className="absolute h-full w-full top-0 right-0 p-2 bg-comp-gray rounded-lg opacity-40"></div>}
      <div className="rounded-t-lg px-4 py-6 bg-primary-blue">
        <p className="text-center text-2xl font-bold text-white">
          {formatDateForDisplay(booking.dateFrom)} - {formatDateForDisplay(booking.dateTo)}
        </p>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div>
          <p>Name on booking:</p>
          <p className="text-lg text-primary-dark">{booking.customer.name}</p>
        </div>
        <div>
          <p>Contact information:</p>
          <p className="text-lg text-primary-dark">{booking.customer.email}</p>
        </div>
        <div>
          <p>Number of guests:</p>
          <p className="text-lg text-primary-dark">{booking.guests}</p>
        </div>
      </div>
      <div className="bg-comp p-6 rounded-b-lg text-primary-blue">
        <p>Booking reference:</p>
        <p className="font-bold">{booking.id}</p>
      </div>
    </div>
  );
}
