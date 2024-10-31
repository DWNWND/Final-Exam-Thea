import { CtaBtn, NavBtn } from "../../Buttons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

// https://www.npmjs.com/package/@demark-pro/react-booking-calendar
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

// CSS Modules, react-booking-calendar-cssmodules.css
// import '@demark-pro/react-booking-calendar/dist/react-booking-calendar-cssmodules.css';

export default function SingleVenue({ venue, formData }) {
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  //add availability calendar
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [hostDetailsOpen, setHostDetailsOpen] = useState(false);

  function toggleAmenities() {
    setAmenitiesOpen(!amenitiesOpen);
  }
  function toggleDetails() {
    setDetailsOpen(!detailsOpen);
  }
  function toggleAvailability() {
    setAvailabilityOpen(!availabilityOpen);
  }
  function toggleHostDetails() {
    setHostDetailsOpen(!hostDetailsOpen);
  }

  const nights = formData.allDatesInRange.length - 1;
  const price = nights * venue.price;

  function handleClick() {
    console.log("clicked");
  }

  // Assuming venue.bookings is an array of bookings with startDate and endDate properties
  const reserved = venue.bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
  }));

  const BookingCalendar = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const myBooking = formData.allDatesInRange;

    console.log("myBooking", myBooking);
    
    const newBookings = myBooking.map(([start, end]) => ({
      startDate: new Date(start),
      endDate: new Date(end),
    }));

    console.log("now booking", newBookings);

    return (
      <Calendar
        bookings={newBookings}
        // onClickDate={() => {}} // Disables date selection
        classNames={{
          CalendarContainer: "w-full bg-comp-purple rounded-lg p-4",
          DayReservation: "bg-primary-blue",
          WeekContent: "text-primary-blue",
          MonthContent: "text-primary-blue",
          MonthArrowNext: "text-primary-blue",
          MonthArrowPrev: "text-primary-blue",
        }}
        selected={selectedDates}
        reserved={reserved}
        onChange={setSelectedDates}
      />
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <NavBtn clickFunc={handleClick} arrow={false} innerText="Edit travel dates" tailw="rounded my-4 md:max-w-40" color="primary-blue" />
        <div className="flex gap-4">
          <Link className="underline">save</Link>
          <Link className="underline">share</Link>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-x-0 top-6 flex flex-col justify-center items-center gap-4 z-30">
          <h1 className="text-center text-2xl font-bold text-white">
            from: {formData.allDatesInRange[0]} <br></br> to: {formData.allDatesInRange.at(-1)}
          </h1>
          <div className="rounded-full font-bold p-4 bg-white text-primary-blue flex items-center justify-center w-48">
            kr {price} ({nights} {nights < 1 ? "nights" : "night"})
          </div>
        </div>
        <div>
          <div className="absolute bg-black bg-opacity-20 w-full h-full rounded-t-lg"></div>
          <img src={venue.media && venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className="w-full h-96 object-cover rounded-lg" />
        </div>
        <div className="absolute inset-x-0 -bottom-4 flex flex-col justify-center items-center gap-4 px-6">
          <CtaBtn type="submit" innerText="Book property" tailw="mt-4 md:mt-0 rounded-full bg-primary-blue w-full text-nowrap z-30" mainCta={true} />
        </div>
      </div>
      <div className="p-4 mt-6 flex justify-between">
        <div>
          <h3 className="text-xl font-bold text-black">{venue.name}</h3>
          <p className="text-black">
            {venue.location.city}, {venue.location.country}
          </p>
          <p className="text-black font-semibold mt-4">kr {venue.price}/night</p>
        </div>
        <div>
          <p>★ {venue.rating}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-comp-purple p-4 rounded-lg">
          <div className="" onClick={() => toggleAmenities()}>
            <h2 className="flex items-center gap-2 justify-between">
              <span className="uppercase">Amenities</span> {amenitiesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </h2>
            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${amenitiesOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col mt-3">
                <p className="">{venue.meta.breakfast && "Breakfast included"}</p>
                <p className="">{venue.meta.parking && "Free parking"}</p>
                <p className="">{venue.meta.pets && "Pets allowed"}</p>
                <p className="">{venue.meta.wifi && "Free WiFi"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-comp-purple p-4 rounded-lg">
          <div className="" onClick={() => toggleDetails()}>
            <h2 className="flex items-center gap-2 justify-between">
              <span className="uppercase">Details</span> {detailsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </h2>
            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${detailsOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col mt-3">
                <p className="">{venue.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-comp-purple p-4 rounded-lg">
          <div className="" onClick={() => toggleHostDetails()}>
            <h2 className="flex items-center gap-2 justify-between">
              <span className="uppercase">Host</span> {hostDetailsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </h2>
            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${hostDetailsOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex mt-3 gap-4 items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{venue.owner.name}</p>
                  <p className="">{venue.owner.bio}</p>
                  <p className="">Contact host via: {venue.owner.email}</p>
                </div>
                <div>
                  <img src={venue.owner.avatar.url} className="max-w-20 max-h-20 rounded-full"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-comp-purple p-4 rounded-lg">
          <div className="">
            <h2 className="flex items-center gap-2 justify-between" onClick={() => toggleAvailability()}>
              <span className="uppercase">Availability</span> {availabilityOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </h2>
            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${availabilityOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex mt-3 gap-4 items-center justify-between">
                <div className="flex flex-col gap-1 w-full">
                  <BookingCalendar />
                  {/* <p className="">Available from: {venue.availability.from}</p>
                  <p className="">Available to: {venue.availability.to}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
