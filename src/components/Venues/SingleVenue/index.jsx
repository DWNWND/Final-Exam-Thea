import { useState, useEffect } from "react";
import { MdOutlinePets, MdEmojiFoodBeverage } from "react-icons/md";
import { FaParking, FaWifi } from "react-icons/fa";
import SelectTravelDates from "../../Forms/SearchTravel/SelectTravelDates/index.jsx";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";
import calculateNightsBetween from "../../../utils/calcNights/calculateNightsBetween.js";
import BookingCalendar from "../../BookingCalendar/index";
import { useSearchStore, useAuthStore, useBookingDataStore, useTravelDatesStore } from "../../../stores";
import { IoIosClose } from "react-icons/io";
import { FaShare, FaRegHeart } from "react-icons/fa";
import formatDateForFlatpickr from "../../../utils/dateUtils/formatDateForFlatpickr.js";
import generateAllTravelDates from "../../../utils/dateUtils/generateAllDatesArr.js";
import { useNavigate } from "react-router-dom";
import NumberOfGuests from "../../Forms/SearchTravel/NumberOfGuests/index.jsx";
import SquareBtn from "../../Buttons/SquareBtn/index.jsx";
import ArrowDownBtn from "../../Buttons/ArrowDownBtn/index.jsx";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch.jsx";

export default function SingleVenue() {
  const { id } = useParams();
  const { fetchFromApi } = useFetch();
  const { setBookingData, setSelectedVenue, clearBookingData } = useBookingDataStore();
  const { savedDates, setSavedDates, setInitialDates, setDefaultFlatpickrDates } = useTravelDatesStore();
  const { accessToken, userName, logOut } = useAuthStore();
  const { travelSearchData } = useSearchStore();

  const [listing, setListing] = useState(null);
  const [yourListing, setYourListing] = useState(false);

  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [hostDetailsOpen, setHostDetailsOpen] = useState(false);

  const [editDates, setEditDates] = useState(false);

  const [imageModal, setImageModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [listingReserved, setListingReserved] = useState([]);
  const [nights, setNights] = useState(0);

  const [travelDatesOutsideRanges, setTravelDatesOutsideRanges] = useState(true);

  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");

  const navigate = useNavigate();

  const fetchSingleListing = async () => {
    const response = await fetchFromApi(`/holidaze/venues/${id}?_bookings=true&_owner=true`);
    if (response.success) {
      setListing(response.data);
      // console.log("response", response.data);
    } else {
      console.log("this is the error that havent been checked in singleVenue:", response.error);
      setMainErrorMessage(response.error); // this errormessage have not been checked
    }
  };

  useEffect(() => {
    clearBookingData();
    fetchSingleListing();
  }, []);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setInitialDates({
      todayDateObj: today,
      tomorrowDateObj: tomorrow,
    });

    const initializeDates = () => {
      // Set date store if its not set yet
      const startYYYYMMDD = formatDateForFlatpickr(today);
      const endYYYYMMDD = formatDateForFlatpickr(tomorrow);
      const dateRangeArrYYYYMMDD = generateAllTravelDates(startYYYYMMDD, endYYYYMMDD);
      const startDisplay = formatDateForDisplay(today); //for display
      const endDisplay = formatDateForDisplay(tomorrow); //for display
      setSavedDates({
        endYYYYMMDD: endYYYYMMDD,
        startYYYYMMDD: startYYYYMMDD,
        endDisplay: endDisplay,
        startDisplay: startDisplay,
        endDateObj: today,
        startDateObj: tomorrow,
        dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
      });
      setDefaultFlatpickrDates(`${startYYYYMMDD} to ${endYYYYMMDD}`);
    };
    const updateDatesIfPast = () => {
      // Determine if dates are in the past or if endDate is same as startDate
      const startDateInPast = savedDates.startDateObj && new Date(savedDates.startDateObj) < new Date(today); //do these have to be Date objects to find the difference?
      const endDateInPast = savedDates.endDateObj && new Date(savedDates.endDateObj) < new Date(savedDates.startDateObj); //do these have to be Date objects to find the difference?
      const endDateIsSameAsStartDate = savedDates.endDateObj && savedDates.endDateObj === savedDates.startDateObj; //do these have to be Date objects to find the difference?
      if (endDateInPast) {
        // endDate is in the past (all dates must be invalid)
        initializeDates();
      }
      if (startDateInPast) {
        //startDate is in the past (update startDate AND update endDate if it's the same as the new startDate)
        const newStartDate = startDateInPast ? today : savedDates.startDateObj;
        const newStartDateIsSameAsEndDate = newStartDate && newStartDate === savedDates.endDateObj;
        const newEndDate = newStartDateIsSameAsEndDate ? new Date(newStartDate.setDate(newStartDate.getDate() + 1)) : savedDates.endDateObj;
        const endYYYYMMDD = formatDateForFlatpickr(newEndDate);
        const startYYYYMMDD = formatDateForFlatpickr(newStartDate);
        const endDisplay = formatDateForDisplay(newEndDate); //for display
        const startDisplay = formatDateForDisplay(newStartDate); //for display
        const dateRangeArrYYYYMMDD = generateAllTravelDates(startYYYYMMDD, endYYYYMMDD);
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
        // endDate and startDate is the same (if there has been a glitch and the dates are the same, update endDate to the next day)
        const newEndDate = new Date(savedDates.startDateObj.setDate(savedDates.startDateObj.getDate() + 1));
        const endYYYYMMDD = formatDateForFlatpickr(newEndDate);
        const dateRangeArrYYYYMMDD = generateAllTravelDates(savedDates.startYYYYMMDD, endYYYYMMDD);
        const endDisplay = formatDateForDisplay(newEndDate); //for display
        setSavedDates({
          endYYYYMMDD: endYYYYMMDD,
          endDateObj: newEndDate,
          endDisplay: endDisplay,
          dateRangeArrYYYYMMDD: dateRangeArrYYYYMMDD,
        });
        setDefaultFlatpickrDates(`${savedDates.startYYYYMMDD} to ${endYYYYMMDD}`);
      } else {
        // No dates are wrong, set default date string for display
        setDefaultFlatpickrDates(`${savedDates.startYYYYMMDD} to ${savedDates.endYYYYMMDD}`);
      }
    };
    // Check on component mount/reload (if no dates are saved, initialize them, if they are saved, check if they are correct)
    if (!savedDates || savedDates.dateRangeArrYYYYMMDD.length === 0) {
      initializeDates();
    } else {
      updateDatesIfPast();
    }
    // Set up interval to check for past dates every 10 minutes
    const interval = setInterval(updateDatesIfPast, 10 * 60 * 1000);
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Dependency array left empty for initial mount/reload behavior

  useEffect(() => {
    if (listing) {
      setSelectedVenue(listing);
      setYourListing(userName === listing.owner.name);

      const reserved = listing.bookings.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
      }));

      setListingReserved(reserved);

      const nights = calculateNightsBetween(savedDates.startYYYYMMDD, savedDates.endYYYYMMDD);
      const price = nights * listing.price;
      setTotalPrice(price);
      setNights(nights);

      function isOutsideAllRanges(startDate, endDate, reservedDates) {
        const checkStartDate = new Date(startDate);
        const checkEndDate = new Date(endDate);
        // Check if the travelDates range does not overlap with any ranges in dateRanges
        return reservedDates.every((range) => {
          // Travel dates are outside the range if they end before the range starts or start after the range ends
          return checkEndDate < range.startDate || checkStartDate > range.endDate;
        });
      }
      const isTravelOutsideAllRanges = isOutsideAllRanges(savedDates.startDateObj, savedDates.endDateObj, reserved); // true if travelDates is outside all ranges, false otherwise
      setTravelDatesOutsideRanges(isTravelOutsideAllRanges);
    }
  }, [listing, savedDates]);

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
  function toggleImageModal() {
    setImageModal(!imageModal);
  }
  function toggleBookingModal() {
    setBookingModal(!bookingModal);
    setUserFeedbackMessage("");
  }

  function bookPropertyFunc(continueAs) {
    if (travelSearchData.numberOfGuests <= listing.maxGuests && travelDatesOutsideRanges) {
      const booking = {
        dateFrom: savedDates.startYYYYMMDD,
        dateTo: savedDates.endYYYYMMDD,
        guests: travelSearchData.numberOfGuests,
        venueId: listing.id,
      };
      setBookingModal(false);

      if (continueAs === userName) {
        setBookingData(booking);
        navigate("/booking/details");
      }
      if (continueAs === "login") {
        setBookingData(booking);
        navigate("/login");
      }
      if (continueAs === "register") {
        setBookingData(booking);
        navigate("/register");
      }
      if (continueAs === "changeAccount") {
        setBookingData(booking);
        logOut();
        navigate("/login");
      }
    } else {
      setUserFeedbackMessage("We're sorry. This property is not available for the selected dates or number of guests. Please select different dates or number of guests");
    }
  }

  return (
    <>
      {listing && (
        <>
          <div>
            {imageModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75" onClick={toggleImageModal}>
                <div className="relative ">
                  <button className="absolute top-2 right-2 text-white text-3xl" onClick={toggleImageModal}>
                    <IoIosClose />
                  </button>
                  <img src={listing.media && listing.media.length > 0 ? listing.media[0].url : null} alt={listing.media.length > 0 ? listing.media[0].alt : null} className="max-w-full max-h-screen rounded-lg" />
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
                  {savedDates.startDisplay} - {savedDates.endDisplay}
                </h1>
                <div className="rounded-full font-bold p-4 bg-white text-primary-blue flex items-center justify-center w-48">
                  kr {totalPrice} ({nights} {nights > 1 ? "nights" : "night"})
                </div>
              </div>
              <div className="cursor-pointer" onClick={toggleImageModal}>
                <div className="absolute bg-black bg-opacity-20 w-full h-full rounded-t-lg"></div>
                <img src={listing.media && listing.media.length > 0 ? listing.media[0].url : null} alt={listing.media.length > 0 ? listing.media[0].alt : null} className="w-full h-96 md:h-[42rem] object-cover rounded-lg" />
              </div>
              <div className="absolute inset-x-0 -bottom-6 flex flex-col justify-center items-center gap-4 px-6 md:px-[10rem]">
                {/* same as round btn, it would not work with the conditional rendering */}
                <button
                  type="button"
                  className={`${travelSearchData.numberOfGuests > listing.maxGuests || !travelDatesOutsideRanges || yourListing ? "bg-white text-comp-purple cursor-not-allowed" : "font-semibold bg-primary-blue text-white shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer"}
    text-xl md:text-2xl py-3 mt-4 md:mt-0 z-30 w-full px-20 uppercase h-full text-nowrap flex justify-center items-center rounded-full transition-all duration-300 ease-in-out`}
                  onClick={() => toggleBookingModal()}
                  disabled={(travelSearchData.numberOfGuests > listing.maxGuests && !travelDatesOutsideRanges) || yourListing}>
                  {!yourListing ? <>{travelSearchData.numberOfGuests > listing.maxGuests || !travelDatesOutsideRanges ? "Unavailable" : "Book"}</> : "Book"}
                </button>
              </div>
            </div>
            {!yourListing ? (
              <>
                <p className="mt-8 text-danger text-center italic">{travelSearchData.numberOfGuests > listing.maxGuests && `This property only accepts ${listing.maxGuests} guests pr. booking`}</p>
                <p className="text-danger text-center italic">{!travelDatesOutsideRanges && "This property is fully booked for the selected travel dates"}</p>
              </>
            ) : (
              <p className="mt-8 text-center italic">you are the owner of this listing and can therefore not book it</p>
            )}

            <div className="p-4 mb-2 md:my-6 flex justify-between">
              <div>
                <h3 className="text-xl font-bold text-black">{listing.name}</h3>
                <p className="text-black">
                  {listing.location.city}, {listing.location.country}
                </p>
                <p className="text-black font-semibold mt-4">kr {listing.price}/night</p>
              </div>
              <div>
                <p className="text-nowrap">★ {listing.rating}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Details title="Amenities" toggleState={amenitiesOpen} toggleFunc={toggleAmenities}>
                <div className="flex flex-col mt-3 gap-2 p-6  bg-white bg-opacity-100 border border-primary-blue rounded-lg">
                  <p className={`flex items-center gap-4 ${listing.meta.breakfast ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                    <MdEmojiFoodBeverage />
                    Breakfast included
                  </p>
                  <p className={`flex items-center gap-4 ${listing.meta.parking ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                    <FaParking />
                    Free parking
                  </p>
                  <p className={`flex items-center gap-4 ${listing.meta.pets ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                    <MdOutlinePets />
                    Pets allowed
                  </p>
                  <p className={`flex items-center gap-4 ${listing.meta.wifi ? "text-primary-blue" : "text-comp-purple line-through"} `}>
                    <FaWifi />
                    Free WiFi
                  </p>
                </div>
              </Details>
              <Details title="Description" toggleState={descriptionOpen} toggleFunc={toggleDescription}>
                <div className="flex flex-col mt-3  p-4">
                  <p className="">{listing.description}</p>
                </div>
              </Details>
              <Details title="Host details" toggleState={hostDetailsOpen} toggleFunc={toggleHostDetails}>
                <div className="flex mt-3 gap-4 items-center p-2 md:p-4">
                  <div>
                    <img src={listing.owner.avatar.url} className="min-w-20 min-h-20 max-w-20 max-h-20 object-cover rounded-full"></img>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold uppercase text-lg">{listing.owner.name}</p>
                    <p className="">{listing.owner.bio}</p>
                    <a href={`mailto:${listing.owner.email}`} className="underline">
                      click here to contact host
                    </a>
                  </div>
                </div>
              </Details>
              <Details title="Availability" toggleState={availabilityOpen} toggleFunc={toggleAvailability}>
                <div className="  mt-3 gap-2 flex flex-col w-full items-center"> {savedDates && savedDates.startYYYYMMDD && <BookingCalendar reserved={listingReserved} />}</div>
              </Details>
            </div>
            <div className="flex gap-8 justify-center pt-10 md:my-10 text-2xl text-primary-blue">
              <FaRegHeart />
              <FaShare />
            </div>
          </div>
          {bookingModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white relative p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10">
                <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={toggleBookingModal}>
                  <IoIosClose />
                </button>
                <h2 className="text-xl font-bold mb-4 text-primary-blue">Continue booking as:</h2>
                <p className="text-sm mb-6 text-primary-blue">Choose how you would like to proceed with the booking</p>
                <div className="flex flex-col justify-end gap-4">
                  {accessToken ? (
                    <>
                      <SquareBtn clickFunc={bookPropertyFunc} funcProp={userName} type="button" width="full" innerText={`${userName}`} tailw="" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
                      <SquareBtn clickFunc={bookPropertyFunc} funcProp="changeAccount" type="button" width="full" innerText="login with a different account" tailw="lowercase" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
                    </>
                  ) : (
                    <>
                      <SquareBtn clickFunc={bookPropertyFunc} funcProp="register" type="button" width="full" innerText="register new user" tailw="" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
                      <SquareBtn clickFunc={bookPropertyFunc} funcProp="login" type="button" width="full" innerText="login" tailw="" bgColor="primary-green" textColor="white" borderColor="primary-green" />
                    </>
                  )}
                </div>
                {userFeedbackMessage && <p className="text-danger text-xs text-center mt-5">{userFeedbackMessage}</p>}
              </div>
            </div>
          )}
        </>
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
