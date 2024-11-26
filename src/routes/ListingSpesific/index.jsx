import { Helmet, HelmetProvider } from "react-helmet-async";
import MainElement from "../../components/MainElement/";
import { useBookingDataStore, useAuthStore, useTravelDatesStore, useTravelSearchStore } from "../../stores";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApiCall } from "../../hooks";
import { ImageModal, BookingModal } from "../../components/Modals";
import { FaRegHeart, FaShare } from "react-icons/fa";
import SelectTravelDates from "../../components/Forms/TravelSearch/Filters/SelectTravelDates/";
import NumberOfGuests from "../../components/Forms/TravelSearch/Filters/NumberOfGuests/";

import ListingDetailsAccordion from "../../components/Accordion/ListingDetailsAccordion";
import { calculateNights } from "../../utils/";

//ADD LOADER AND ERRORFALLBACK

export default function ListingSpesific() {
  const { selectedListing, setSelectedListing } = useBookingDataStore();
  const { setInitialDates, savedDates } = useTravelDatesStore();
  const { userName } = useAuthStore();
  const { travelSearchData } = useTravelSearchStore();

  const { id } = useParams();
  const { loading, error, callApi } = useApiCall(); //this is the error and loading states to use

  const [listing, setListing] = useState(null);
  const [yourListing, setYourListing] = useState(false);
  const [editDates, setEditDates] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listingReserved, setListingReserved] = useState([]);
  const [nights, setNights] = useState(0);
  const [listingIsAvailable, setListingIsAvailable] = useState(true);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setInitialDates({
      todayDateObj: today,
      tomorrowDateObj: tomorrow,
    });

    const fetchSingleListing = async () => {
      const result = await callApi(`/holidaze/venues/${id}?_bookings=true&_owner=true`);
      setListing(result.data);
    };

    fetchSingleListing();
  }, []);

  useEffect(() => {
    if (listing) {
      setSelectedListing(listing);
      setYourListing(userName === listing.owner.name);

      const reserved = listing.bookings.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
      }));
      setListingReserved(reserved);

      const checkAvailability = () => {
        const checkStartDate = new Date(savedDates.startDateObj);
        const checkEndDate = new Date(savedDates.endDateObj);
        const isAvailable = reserved.every((range) => {
          return checkEndDate < range.startDate || checkStartDate > range.endDate;
        });
        return isAvailable;
      };
      setListingIsAvailable(checkAvailability());

      const nights = calculateNights(savedDates.startYYYYMMDD, savedDates.endYYYYMMDD);
      const price = nights * listing.price;
      setTotalPrice(price);
      setNights(nights);
    }
  }, [listing, savedDates]);

  const toggleEditDates = () => setEditDates(!editDates);
  const toggleImageModal = () => setImageModal(!imageModal);
  const toggleBookingModal = () => setBookingModal(!bookingModal);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title> {`${selectedListing && selectedListing.name} | Holidaze`}</title>
        <meta name="description" content={`${selectedListing && selectedListing.description}`} />
      </Helmet>
      <MainElement>
        {listing && (
          <>
            <div>
              {imageModal && <ImageModal image={listing.media && listing.media.length > 0 ? listing.media[0].url : null} alt={listing.media.length > 0 ? listing.media[0].alt : null} toggle={toggleImageModal} />}
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className={`flex w-full md:max-w-64`}>
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
                  <button type="button" className={`${travelSearchData.numberOfGuests > listing.maxGuests || !listingIsAvailable || yourListing ? "bg-white text-comp-purple cursor-not-allowed" : "font-semibold bg-primary-blue text-white shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer"} text-xl md:text-2xl py-3 mt-4 md:mt-0 z-30 w-full px-20 uppercase h-full text-nowrap flex justify-center items-center rounded-full transition-all duration-300 ease-in-out`} onClick={() => toggleBookingModal()} disabled={(travelSearchData.numberOfGuests > listing.maxGuests && !listingIsAvailable) || yourListing}>
                    {!yourListing ? <>{travelSearchData.numberOfGuests > listing.maxGuests || !listingIsAvailable ? "Unavailable" : "Book"}</> : "Book"}
                  </button>
                </div>
              </div>
              {!yourListing ? (
                <>
                  <p className="mt-8 text-danger text-center italic">{travelSearchData.numberOfGuests > listing.maxGuests && `This property only accepts ${listing.maxGuests} guests pr. booking`}</p>
                  <p className="text-danger text-center italic">{!listingIsAvailable && "This property is fully booked for the selected travel dates"}</p>
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
              <ListingDetailsAccordion listing={listing} listingReserved={listingReserved} listingIsAvailable={listingIsAvailable} />
              <div className="flex gap-8 justify-center pt-10 md:my-10 text-2xl text-primary-blue">
                <FaRegHeart />
                <FaShare />
              </div>
            </div>
            {bookingModal && <BookingModal toggle={toggleBookingModal} listingIsAvailable={listingIsAvailable} />}
          </>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
