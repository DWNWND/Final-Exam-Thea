import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlinePets, MdEmojiFoodBeverage } from "react-icons/md";
import { FaParking, FaWifi } from "react-icons/fa";
import SelectTravelDates from "../../Forms/SearchTravel/SelectTravelDates/index.jsx";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";
import claculateNightsBetween from "../../../utils/calcNights/claculateNightsBetween.js";
import BookingCalendar from "../../BookingCalendar/index.jsx";
import { useSearchStore } from "../../../stores/useSearchStore.js";
import { IoIosClose } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import useAuthStore from "../../../stores/useAuthStore.js";
import getFormattedDate from "../../../utils/dateUtils/formayDateForFlatpickr.js";
import generateAllTravelDates from "../../../utils/dateUtils/generateAllDatesArr.js";
import { useNavigate } from "react-router-dom";
import NumberOfGuests from "../../Forms/SearchTravel/NumberOfGuests/index.jsx";

export default function SingleVenue({ venue }) {
  const { travelSearchData, selectedVenue, setTravelDates, setAllDatesArr, setSelectedVenue } = useSearchStore();
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [hostDetailsOpen, setHostDetailsOpen] = useState(false);
  const [editDates, setEditDates] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingReserved, setBookingReserved] = useState([]);
  const [nights, setNights] = useState(0);
  const [travelDatesOutsideRanges, setTravelDatesOutsideRanges] = useState(true);
  const navigate = useNavigate();

  function toggleAmenities() {
    setAmenitiesOpen(!amenitiesOpen);
  }
  function toggleDescription() {
    setDescriptionOpen(!descriptionOpen);
  }
  function toggleAvailability() {
    setAvailabilityOpen(!availabilityOpen);
  }
  function toggleHostDetails() {
    setHostDetailsOpen(!hostDetailsOpen);
  }
  function toggleEditDates() {
    setEditDates(!editDates);
  }
  // Toggle modal open/close
  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const todayString = getFormattedDate(new Date());
  const tomorrowString = getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  useEffect(() => {
    if (!travelSearchData.travelDates || Object.keys(travelSearchData.travelDates).length === 0) {
      // Set initial date range if empty
      setTravelDates({ startDate: todayString, endDate: tomorrowString });
      setAllDatesArr(generateAllTravelDates(todayString, tomorrowString));

      const startDate = new Date(todayString);
      const formattedStartDate = formatDateForDisplay(startDate);
      setFormattedStartDate(formattedStartDate);

      const endDate = new Date(tomorrowString);
      const formattedEndDate = formatDateForDisplay(endDate);
      setFormattedEndDate(formattedEndDate);

      const nights = claculateNightsBetween(todayString, tomorrowString);
      const price = nights * venue.price;
      setTotalPrice(price);
      setNights(nights);
    } else {
      // Set date range from store
      const startDate = new Date(travelSearchData.travelDates.startDate);
      const formattedStartDate = formatDateForDisplay(startDate);
      setFormattedStartDate(formattedStartDate);

      const endDate = new Date(travelSearchData.travelDates.endDate);
      const formattedEndDate = formatDateForDisplay(endDate);
      setFormattedEndDate(formattedEndDate);

      const nights = claculateNightsBetween(travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate);
      const price = nights * venue.price;
      setTotalPrice(price);
      setNights(nights);
    }

    // Set up an interval to check for a date change every minute
    const interval = setInterval(() => {
      const newTodayString = todayString;
      const newTomorrowString = tomorrowString;

      // If the day has changed, update the dates in the store
      if (newTodayString !== todayString) {
        setTravelDates({ startDate: newTodayString, endDate: newTomorrowString });
        setAllDatesArr(generateAllTravelDates(newTodayString, newTomorrowString));
      }
    }, 10 * 60 * 1000); // Check every 10 minutes

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [travelSearchData.travelDates, setTravelDates, setAllDatesArr]);

  useEffect(() => {
    const reserved = venue.bookings.map((booking) => ({
      startDate: new Date(booking.dateFrom),
      endDate: new Date(booking.dateTo),
    }));

    setBookingReserved(reserved);
    // Convert travelDates startDate and endDate to Date objects
    const travelStart = new Date(travelSearchData.travelDates.startDate);
    const travelEnd = new Date(travelSearchData.travelDates.endDate);

    function isOutsideAllRanges(travelStart, travelEnd, ranges) {
      // Check if the travelDates range does not overlap with any ranges in dateRanges
      return ranges.every((range) => {
        // Travel dates are outside the range if they end before the range starts
        // or start after the range ends
        return travelEnd < range.startDate || travelStart > range.endDate;
      });
    }
    const isTravelOutsideAllRanges = isOutsideAllRanges(travelStart, travelEnd, reserved); // true if travelDates is outside all ranges, false otherwise
    setTravelDatesOutsideRanges(isTravelOutsideAllRanges);
    console.log("isTravelOutsideAllRanges", isTravelOutsideAllRanges);
  }, [travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate, venue]);

  function bookPropertyFunc() {
    if (travelSearchData.numberOfGuests <= venue.maxGuests && travelDatesOutsideRanges) {
      setSelectedVenue(venue);
      navigate("/booking/summary");
    } else {
      alert("The property is not available for the selected dates or number of guests. Please select different dates or number of guests");
      //do not use alert, send feedback in a different way!
    }
  }

  return (
    <div>
      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={toggleModal}>
          <div className="relative">
            <button className="absolute top-2 right-2 text-white text-3xl" onClick={toggleModal}>
              <IoIosClose />
            </button>
            <img src={venue.media && venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className="max-w-full max-h-screen rounded-lg" />
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
        <div className={`flex w-full`}>
          <button onClick={toggleEditDates} className={`text-nowrap flex justify-center border border-solid border-primary-green text-primary-green uppercase hover:shadow-md cursor-pointer w-full items-center rounded transition-max-height duration-500 ease-in-out overflow-hidden ${!editDates ? "px-3 max-w-full md:max-w-64  opacity-100" : "max-w-0 opacity-0"}`}>
            Edit travel dates
          </button>
          <SelectTravelDates toggleDatesFunc={toggleEditDates} color="primary-blue" tailw={`transition-max-height duration-500 ease-in-out overflow-hidden  ${editDates ? "px-3 max-w-full  md:max-w-64 opacity-100" : "max-w-0 opacity-0"}`} />
        </div>
        <NumberOfGuests color="primary-blue" mainSearch="false" />
      </div>
      <div className="relative">
        <div className="absolute inset-x-0 top-6 flex flex-col justify-center items-center gap-4 z-30 cursor-pointer" onClick={toggleModal}>
          <h1 className="text-center text-2xl font-bold text-white">
            {formattedStartDate} - {formattedEndDate}
          </h1>
          <div className="rounded-full font-bold p-4 bg-white text-primary-blue flex items-center justify-center w-48">
            kr {totalPrice} ({nights} {nights > 1 ? "nights" : "night"})
          </div>
        </div>
        <div className="cursor-pointer" onClick={toggleModal}>
          <div className="absolute bg-black bg-opacity-20 w-full h-full rounded-t-lg"></div>
          <img src={venue.media && venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className="w-full h-96 md:h-[42rem] object-cover rounded-lg" />
        </div>
        <div className="absolute inset-x-0 -bottom-6 flex flex-col justify-center items-center gap-4 px-6 md:px-20">
          <button onClick={() => bookPropertyFunc()} type="button" disabled={travelSearchData.numberOfGuests > venue.maxGuests && !travelDatesOutsideRanges} className={`${travelSearchData.numberOfGuests > venue.maxGuests || !travelDatesOutsideRanges ? "bg-comp-gray text-primary-light" : "font-semibold bg-primary-blue text-white shadow-lg hover:border hover:border-primary-blue hover:text-primary-blue hover:bg-comp"} md:text-2xl py-3 mt-4 md:mt-0 rounded-full text-nowrap z-30 w-full p-2 px-20 flex justify-center  text-xl uppercase `}>
            {travelSearchData.numberOfGuests > venue.maxGuests || !travelDatesOutsideRanges ? "Unavailable" : "Book"}
          </button>
        </div>
      </div>
      <p className="mt-8 text-danger text-center">{travelSearchData.numberOfGuests > venue.maxGuests && `This property only accepts ${venue.maxGuests} guests pr. booking`}</p>
      <p className="text-danger text-center">{!travelDatesOutsideRanges && "This property is fully booked for the selected travel dates"}</p>
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
        <Details title="Amenities" toggleState={amenitiesOpen} toggleFunc={toggleAmenities}>
          <div className="flex flex-col mt-3 gap-2 p-4">
            <p className="flex items-center gap-4">
              {venue.meta.breakfast && (
                <>
                  <MdEmojiFoodBeverage />
                  Breakfast included
                </>
              )}
            </p>
            <p className="flex items-center gap-4">
              {venue.meta.parking && (
                <>
                  <FaParking />
                  Free parking
                </>
              )}
            </p>
            <p className="flex items-center gap-4">
              {venue.meta.pets && (
                <>
                  <MdOutlinePets />
                  Pets allowed
                </>
              )}
            </p>
            <p className="flex items-center gap-4">
              {venue.meta.wifi && (
                <>
                  <FaWifi />
                  Free WiFi
                </>
              )}
            </p>
          </div>
        </Details>
        <Details title="Description" toggleState={descriptionOpen} toggleFunc={toggleDescription}>
          <div className="flex flex-col mt-3  p-4">
            <p className="">{venue.description}</p>
          </div>
        </Details>
        <Details title="Host details" toggleState={hostDetailsOpen} toggleFunc={toggleHostDetails}>
          <div className="flex mt-3 gap-4 items-center p-4">
            <div>
              <img src={venue.owner.avatar.url} className="max-w-20 max-h-20 rounded-full"></img>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{venue.owner.name}</p>
              <p className="">{venue.owner.bio}</p>
              <p className="">Contact host via: {venue.owner.email}</p>
            </div>
          </div>
        </Details>
        <Details title="Availability" toggleState={availabilityOpen} toggleFunc={toggleAvailability}>
          <div className="flex mt-3 gap-4 p-4 py-10 bg-comp rounded-lg justify-center">
            <div className="flex flex-col gap-1 w-full items-center"> {travelSearchData.travelDates && travelSearchData.travelDates.startDate && <BookingCalendar reserved={bookingReserved} />}</div>
          </div>
        </Details>
        <div className="flex gap-8 justify-center pt-10 text-2xl text-primary-blue">
          <FaRegHeart />
          <FaShare />
        </div>
      </div>
    </div>
  );
}

function Details({ title, toggleState, toggleFunc, children }) {
  return (
    <div className="bg-comp-purple p-4 rounded-lg ">
      <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={() => toggleFunc()}>
        <span className="uppercase font-semibold">{title}</span> {toggleState ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </h2>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${toggleState ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>{children}</div>
    </div>
  );
}
