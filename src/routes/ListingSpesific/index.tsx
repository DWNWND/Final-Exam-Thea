import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MainElement from "../../components/MainElement";
import { useBookingDataStore, useAuthStore, useTravelDatesStore, useTravelSearchStore } from "../../stores";
import { useParams } from "react-router-dom";
import { useApiCall } from "../../hooks";
import { ImageModal, BookingModal } from "../../components/Modals";
import { FaRegHeart, FaShare } from "react-icons/fa";
import { NumberOfGuests, SelectTravelDates } from "../../components/Forms/TravelSearch/Filters";
import ListingDetailsAccordion from "../../components/Accordion/ListingDetailsAccordion";
import { calculateNights } from "../../utils";
import { ListingSpesific } from "../../types";
import { BigSpinnerLoader } from "../../components/Loaders";
import GeneralErrorFallback from "../../components/ErrorFallback/GeneralErrorFallback";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface BookingRange {
  startDate: Date;
  endDate: Date;
}

export default function ListingSpecific(): JSX.Element {
  const { selectedListing, setSelectedListing } = useBookingDataStore();
  const { setInitialDates, savedDates } = useTravelDatesStore();
  const { userName } = useAuthStore();
  const { travelSearchData } = useTravelSearchStore();

  const { id } = useParams();
  const { loading, error, callApi } = useApiCall();

  const [listing, setListing] = useState<ListingSpesific | null>(null);
  const [yourListing, setYourListing] = useState(false);
  const [editDates, setEditDates] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listingReserved, setListingReserved] = useState<BookingRange[]>([]);
  const [nights, setNights] = useState(0);
  const [listingIsAvailable, setListingIsAvailable] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

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
  }, [id]);

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
        return reserved.every((range) => checkEndDate < range.startDate || checkStartDate > range.endDate);
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

  const handleNextImage = () => {
    if (listing?.media) {
      setCurrentImage((index) => (index + 1) % listing.media.length);
    }
  };

  const handlePrevImage = () => {
    if (listing?.media) {
      setCurrentImage((index) => (index === 0 ? listing.media.length - 1 : index - 1));
    }
  };

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`${selectedListing?.name || "Listing"} | Holidaze`}</title>
        <meta name="description" content={selectedListing?.description || "Listing details"} />
      </Helmet>
      <MainElement>
        {loading && <BigSpinnerLoader />}
        {error && <GeneralErrorFallback errorMessage={error} />}
        {listing && (
          <>
            <div>
              {imageModal && <ImageModal image={listing.media?.[currentImage]?.url || ""} alt={listing.media?.[currentImage]?.alt || ""} toggle={toggleImageModal} />}
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <div className={`flex w-full md:max-w-64`}>
                  <button onClick={toggleEditDates} className={`text-nowrap flex py-2 justify-center w-full h-full uppercase rounded hover:shadow-md cursor-pointer transition-max-height duration-500 ease-in-out items-center overflow-hidden ${!editDates ? "px-4 max-w-full md:max-w-64 opacity-100" : "max-w-0 w-0 opacity-0 px-0"} bg-white text-primary-blue border border-primary-blue`}>
                    Edit travel dates
                  </button>
                  <SelectTravelDates toggleDatesFunc={toggleEditDates} editDates={editDates} color="primary-blue" />
                </div>
                <NumberOfGuests color="primary-blue" mainSearch={false} />
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
                  <img src={listing.media?.[currentImage]?.url || ""} alt={listing.media?.[currentImage]?.alt || ""} className="w-full h-96 md:h-[42rem] object-cover rounded-lg" />
                </div>
                {listing.media.length > 1 && (
                  <>
                    <button className="absolute top-[45%] flex items-center justify-center gap-2 h-9 w-9 md:h-14 md:w-14 m-4 font-bold text-xl md:text-2xl text-primary-blue bg-white bg-opacity-50 hover:bg-opacity-100 transition ease-in-out border border-primary-blue rounded-full hover:shadow-md" onClick={handlePrevImage}>
                      <FaArrowLeft />
                    </button>
                    <button className="absolute top-[45%] right-0 flex items-center justify-center gap-2 h-9 w-9 md:h-14 md:w-14 m-4 font-bold text-xl md:text-2xl text-primary-blue bg-white bg-opacity-50 hover:bg-opacity-100 transition ease-in-out border border-primary-blue rounded-full hover:shadow-md" onClick={handleNextImage}>
                      <FaArrowRight />
                    </button>
                  </>
                )}
                <div className="absolute inset-x-0 -bottom-6 flex flex-col justify-center items-center gap-4 px-6 md:px-[10rem]">
                  <button type="button" className={`${travelSearchData.numberOfGuests > listing.maxGuests || !listingIsAvailable || yourListing ? "bg-white text-comp-purple cursor-not-allowed" : "font-semibold bg-primary-blue text-white shadow-sm hover:shadow-lg hover:scale-105 cursor-pointer"} text-xl md:text-2xl py-3 mt-4 md:mt-0 z-30 w-full px-20 uppercase h-full text-nowrap flex justify-center items-center rounded-full transition-all duration-300 ease-in-out`} onClick={toggleBookingModal} disabled={travelSearchData.numberOfGuests > listing.maxGuests || !listingIsAvailable || yourListing}>
                    {!yourListing ? (travelSearchData.numberOfGuests > listing.maxGuests || !listingIsAvailable ? "Unavailable" : "Book") : "Book"}
                  </button>
                </div>
              </div>
              {!yourListing ? (
                <>
                  <p className="mt-8 text-danger text-center italic">{travelSearchData.numberOfGuests > listing.maxGuests && `This property only accepts ${listing.maxGuests} guests per booking`}</p>
                  <p className="text-danger text-center italic">{!listingIsAvailable && "This property is fully booked for the selected travel dates"}</p>
                </>
              ) : (
                <p className="mt-8 text-center italic">You are the owner of this listing and cannot book it</p>
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
