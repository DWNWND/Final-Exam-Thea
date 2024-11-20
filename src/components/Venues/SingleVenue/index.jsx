import { useState, useEffect } from "react";
import { MdOutlinePets, MdEmojiFoodBeverage } from "react-icons/md";
import { FaParking, FaWifi } from "react-icons/fa";
import SelectTravelDates from "../../Forms/SearchTravel/SelectTravelDates/index.jsx";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";
import claculateNightsBetween from "../../../utils/calcNights/claculateNightsBetween.js";
import BookingCalendar from "../../BookingCalendar/index";
import { useSearchStore, useAuthStore } from "../../../stores";
import { IoIosClose } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import getFormattedDate from "../../../utils/dateUtils/formayDateForFlatpickr.js";
import generateAllTravelDates from "../../../utils/dateUtils/generateAllDatesArr.js";
import { useNavigate } from "react-router-dom";
import NumberOfGuests from "../../Forms/SearchTravel/NumberOfGuests/index.jsx";
import SquareBtn from "../../Buttons/SquareBtn/index.jsx";
import ArrowDownBtn from "../../Buttons/ArrowDownBtn/index.jsx";

export default function SingleVenue({ venue }) {
  const { travelSearchData, selectedVenue, setTravelDates, setAllDatesArr, setSelectedVenue } = useSearchStore();
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [hostDetailsOpen, setHostDetailsOpen] = useState(false);
  const [editDates, setEditDates] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [promptModal, setPromptModal] = useState(false);
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingReserved, setBookingReserved] = useState([]);
  const [nights, setNights] = useState(0);
  const [travelDatesOutsideRanges, setTravelDatesOutsideRanges] = useState(true);
  const navigate = useNavigate();
  const { accessToken, userName } = useAuthStore();
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");

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
  function toggleImageModal() {
    setImageModal(!imageModal);
  }

  function togglePromptModal() {
    setPromptModal(!promptModal);
    setUserFeedbackMessage("");
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

    // Set up an interval to check for a date change
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
  }, [travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate, venue]);

  function bookPropertyFunc(continueAs) {
    if (travelSearchData.numberOfGuests <= venue.maxGuests && travelDatesOutsideRanges) {
      setSelectedVenue(venue);
      setPromptModal(false);

      if (continueAs === "guest") {
        navigate("/booking/details");
      }
      if (continueAs === userName) {
        navigate("/booking/details");
      }
      if (continueAs === "login") {
        navigate("/login");
      }
      if (continueAs === "register") {
        navigate("/register");
      }
    } else {
      setUserFeedbackMessage("We're sorry. This property is not available for the selected dates or number of guests. Please select different dates or number of guests");
    }
  }

  const yourListing = userName === venue.owner.name;

  return (
    <>
      <div>
        {/* Image Modal */}
        {imageModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75" onClick={toggleImageModal}>
            <div className="relative ">
              <button className="absolute top-2 right-2 text-white text-3xl" onClick={toggleImageModal}>
                <IoIosClose />
              </button>
              <img src={venue.media && venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className="max-w-full max-h-screen rounded-lg" />
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className={`flex w-full md:max-w-64`}>
            {/* same as squareBtn, it would be too much to style it  */}
            <button onClick={toggleEditDates} className={`text-nowrap flex  py-2 justify-center w-full h-full uppercase rounded hover:shadow-md cursor-pointer transition-max-height duration-500 ease-in-out items-center overflow-hidden ${!editDates ? "px-4 max-w-full md:max-w-64 opacity-100" : "max-w-0 w-0 opacity-0 px-0"} bg-white text-primary-blue border border-primary-blue`}>
              Edit travel dates
            </button>
            <SelectTravelDates toggleDatesFunc={toggleEditDates} editDates={editDates} color="primary-blue" />
          </div>
          <NumberOfGuests color="primary-blue" mainSearch="false" />
        </div>
        <div className="relative">
          <div className="absolute inset-x-0 top-6 flex flex-col justify-center items-center gap-4 z-30 cursor-pointer" onClick={toggleImageModal}>
            <h1 className="text-center text-2xl font-bold text-white">
              {formattedStartDate} - {formattedEndDate}
            </h1>
            <div className="rounded-full font-bold p-4 bg-white text-primary-blue flex items-center justify-center w-48">
              kr {totalPrice} ({nights} {nights > 1 ? "nights" : "night"})
            </div>
          </div>
          <div className="cursor-pointer" onClick={toggleImageModal}>
            <div className="absolute bg-black bg-opacity-20 w-full h-full rounded-t-lg"></div>
            <img src={venue.media && venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className="w-full h-96 md:h-[42rem] object-cover rounded-lg" />
          </div>
          <div className="absolute inset-x-0 -bottom-6 flex flex-col justify-center items-center gap-4 px-6 md:px-[10rem]">
            {/* same as round btn, it would not work with the conditional rendering */}
            <button
              type="button"
              className={`${travelSearchData.numberOfGuests > venue.maxGuests || !travelDatesOutsideRanges || yourListing ? "bg-white text-comp-purple cursor-not-allowed" : "font-semibold bg-primary-blue text-white shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer"} 
    text-xl md:text-2xl py-3 mt-4 md:mt-0 z-30 w-full px-20 uppercase h-full text-nowrap flex justify-center items-center rounded-full transition-all duration-300 ease-in-out`}
              onClick={() => togglePromptModal()}
              disabled={(travelSearchData.numberOfGuests > venue.maxGuests && !travelDatesOutsideRanges) || yourListing}>
              {!yourListing ? <>{travelSearchData.numberOfGuests > venue.maxGuests || !travelDatesOutsideRanges ? "Unavailable" : "Book"}</> : "Book"}
            </button>
          </div>
        </div>
        {!yourListing ? (
          <>
            <p className="mt-8 text-danger text-center italic">{travelSearchData.numberOfGuests > venue.maxGuests && `This property only accepts ${venue.maxGuests} guests pr. booking`}</p>
            <p className="text-danger text-center italic">{!travelDatesOutsideRanges && "This property is fully booked for the selected travel dates"}</p>
          </>
        ) : (
          <p className="mt-8 text-center italic">you are the owner of this listing and can therefore not book it</p>
        )}

        <div className="p-4 mb-2 md:my-6 flex justify-between">
          <div>
            <h3 className="text-xl font-bold text-black">{venue.name}</h3>
            <p className="text-black">
              {venue.location.city}, {venue.location.country}
            </p>
            <p className="text-black font-semibold mt-4">kr {venue.price}/night</p>
          </div>
          <div>
            <p className="text-nowrap">★ {venue.rating}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Details title="Amenities" toggleState={amenitiesOpen} toggleFunc={toggleAmenities}>
            <div className="flex flex-col mt-3 gap-2 p-6  bg-white bg-opacity-100 border border-primary-blue rounded-lg">
              <p className={`flex items-center gap-4 ${venue.meta.breakfast ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                <MdEmojiFoodBeverage />
                Breakfast included
              </p>
              <p className={`flex items-center gap-4 ${venue.meta.parking ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                <FaParking />
                Free parking
              </p>
              <p className={`flex items-center gap-4 ${venue.meta.pets ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                <MdOutlinePets />
                Pets allowed
              </p>
              <p className={`flex items-center gap-4 ${venue.meta.wifi ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                <FaWifi />
                Free WiFi
              </p>
            </div>
          </Details>
          <Details title="Description" toggleState={descriptionOpen} toggleFunc={toggleDescription}>
            <div className="flex flex-col mt-3  p-4">
              <p className="">{venue.description}</p>
            </div>
          </Details>
          <Details title="Host details" toggleState={hostDetailsOpen} toggleFunc={toggleHostDetails}>
            <div className="flex mt-3 gap-4 items-center p-2 md:p-4">
              <div>
                <img src={venue.owner.avatar.url} className="min-w-20 min-h-20 max-w-20 max-h-20 object-cover rounded-full"></img>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold uppercase text-lg">{venue.owner.name}</p>
                <p className="">{venue.owner.bio}</p>
                <a href={`mailto:${venue.owner.email}`} className="underline">
                  click here to contact host
                </a>
              </div>
            </div>
          </Details>
          <Details title="Availability" toggleState={availabilityOpen} toggleFunc={toggleAvailability}>
            {/* <div className="flex mt-3 gap-4 p-4 py-10 bg-white rounded-lg justify-center border border-primary-blue "> */}
            <div className="  mt-3 gap-2 flex flex-col w-full items-center"> {travelSearchData.travelDates && travelSearchData.travelDates.startDate && <BookingCalendar reserved={bookingReserved} />}</div>
            {/* </div> */}
          </Details>
        </div>
        <div className="flex gap-8 justify-center pt-10 md:my-10 text-2xl text-primary-blue">
          <FaRegHeart />
          <FaShare />
        </div>
      </div>
      {promptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white relative p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10">
            <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={togglePromptModal}>
              <IoIosClose />
            </button>
            <h2 className="text-xl font-bold mb-4 text-primary-blue">Continue booking as:</h2>
            <p className="text-sm mb-6 text-primary-blue">Choose how you would like to proceed with the booking</p>
            <div className="flex flex-col justify-end gap-4">
              {accessToken ? (
                <>
                  <SquareBtn clickFunc={bookPropertyFunc} funcProp="guest" type="button" width="full" innerText="guest" tailw="" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
                  <SquareBtn clickFunc={bookPropertyFunc} funcProp={userName} type="button" width="full" innerText={`${userName}`} tailw="" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <SquareBtn clickFunc={bookPropertyFunc} funcProp="guest" type="button" width="full" innerText="guest" tailw="" bgColor="white" textColor="primary-green" borderColor="primary-green" />
                    <SquareBtn clickFunc={bookPropertyFunc} funcProp="register" type="button" width="full" innerText="register new user" tailw="" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
                  </div>
                  <SquareBtn clickFunc={bookPropertyFunc} funcProp="login" type="button" width="full" innerText="login" tailw="" bgColor="primary-green" textColor="white" borderColor="primary-green" />
                </>
              )}
            </div>
            {userFeedbackMessage && <p className="text-danger text-xs text-center mt-5">{userFeedbackMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
}

function Details({ title, toggleState, toggleFunc, children }) {
  return (
    <div className="bg-comp-purple p-4 rounded-lg h-full">
      <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={() => toggleFunc()}>
        <span className="uppercase font-semibold">{title}</span>
        <ArrowDownBtn tailw="text-primary-blue border-none" mainSearch={false} link={true} open={toggleState} />
      </h2>
      <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${toggleState ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>{children}</div>
    </div>
  );
}
