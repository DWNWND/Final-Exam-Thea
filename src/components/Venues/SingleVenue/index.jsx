import { CtaBtn, NavBtn } from "../../Buttons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlinePets } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { FaWifi } from "react-icons/fa";

// https://www.npmjs.com/package/@demark-pro/react-booking-calendar
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import { useSearchStore } from "../../../stores/useSearchStore.js";

// CSS Modules, react-booking-calendar-cssmodules.css
// import '@demark-pro/react-booking-calendar/dist/react-booking-calendar-cssmodules.css';

export default function SingleVenue({ venue }) {
  const { formData, updateFormData } = useSearchStore();

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

  function nightsBetween(startDate, endDate) {
    const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds per day
    const diffInMs = new Date(endDate) - new Date(startDate); // Difference in milliseconds
    const days = Math.floor(diffInMs / msPerDay);
    return days > 0 ? days : 0; // Return 0 if the dates are the same or invalid
  }

  // Usage
  const start = formData.dateRange.startDate;
  const end = formData.dateRange.endDate;
  console.log(nightsBetween(start, end)); // Output: 14

  const nights = nightsBetween(formData.dateRange.startDate, formData.dateRange.endDate);

  // const nights = formData.allDatesInRange.length - 1;
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
    const myBooking = formData.allDatesRange;

    console.log("myBooking", myBooking);

    let newBookingArr = [];

    for (let i = 0; i < myBooking.length; i++) {
      const timestamp = Date.parse(myBooking[i]);
      const dateObject = new Date(timestamp);
      newBookingArr.push(dateObject);
    }

    let newBookingArr2 = [];
    newBookingArr2.push(newBookingArr[0], newBookingArr.at(-1));

    return (
      <Calendar
        // bookings={newBookingArr[0]}
        // onClickDate={() => {}} // Disables date selections
        classNames={{
          CalendarContainer: "bg-comp rounded-lg p-4",
          DayReservation: "bg-comp-gray",
          WeekContent: "text-primary-blue",
          MonthContent: "text-primary-blue",
          MonthArrowNext: "text-primary-blue",
          MonthArrowPrev: "text-primary-blue",
          DayToday: "border-none",
          DaySelection: "bg-primary-green",
        }}
        selected={newBookingArr2}
        reserved={reserved}
        onChange={setSelectedDates}
      />
    );
  };

  const startDate = new Date(formData.dateRange.startDate);

  const formattedStartDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(startDate);

  console.log(formattedStartDate); // Output: "Mon 11 Nov"

  const endDate = new Date(formData.dateRange.endDate);

  const formattedEndDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(endDate);

  console.log(formattedEndDate); // Output: "Mon 11 Nov"

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
            from: {formattedStartDate} <br></br> to: {formattedEndDate}
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
          <div className="">
            <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={() => toggleAmenities()}>
              <span className="uppercase font-semibold">Amenities</span> {amenitiesOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </h2>
            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${amenitiesOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col mt-3 gap-2 p-4">
                <p className="flex items-center gap-2">
                  <MdEmojiFoodBeverage />
                  {venue.meta.breakfast && "Breakfast included"}
                </p>
                <p className="flex items-center gap-2">
                  <FaParking />
                  {venue.meta.parking && "Free parking"}
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlinePets />
                  {venue.meta.pets && "Pets allowed"}
                </p>
                <p className="flex items-center gap-2">
                  <FaWifi />
                  {venue.meta.wifi && "Free WiFi"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-comp-purple p-4 rounded-lg">
          <div className="">
            <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={() => toggleDetails()}>
              <span className="uppercase font-semibold">Details</span> {detailsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </h2>
            <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${detailsOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="flex flex-col mt-3">
                <p className="">{venue.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-comp-purple p-4 rounded-lg">
          <div className="">
            <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={() => toggleHostDetails()}>
              <span className="uppercase font-semibold">Host</span> {hostDetailsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
            <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={() => toggleAvailability()}>
              <span className="uppercase font-semibold">Availability</span> {availabilityOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
