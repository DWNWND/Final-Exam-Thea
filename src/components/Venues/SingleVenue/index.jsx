import { CtaBtn, NavBtn } from "../../Buttons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlinePets, MdEmojiFoodBeverage } from "react-icons/md";
import { FaParking, FaWifi } from "react-icons/fa";
import SelectTravelDates from "../../Forms/SearchForm/SelectTravelDates/index.jsx";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";
import claculateNightsBetween from "../../../utils/calcNights/claculateNightsBetween.js";
import BookingCalendar from "../../BookingCalendar/index.jsx";
import { useSearchStore } from "../../../stores/useSearchStore.js";
import { IoIosClose } from "react-icons/io";
import { FaShare } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

export default function SingleVenue({ venue }) {
  const { travelSearchData } = useSearchStore();
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [hostDetailsOpen, setHostDetailsOpen] = useState(false);
  const [editDates, setEditDates] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const nights = claculateNightsBetween(travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate);
  const price = nights * venue.price;

  const reserved = venue.bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
  }));

  const startDate = new Date(travelSearchData.travelDates.startDate);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(travelSearchData.travelDates.endDate);
  const formattedEndDate = formatDateForDisplay(endDate);

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

      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className={`flex w-full`}>
          <button onClick={toggleEditDates} className={`text-nowrap flex justify-center border border-solid border-primary-green text-primary-green uppercase hover:shadow-md cursor-pointer w-full items-center rounded transition-max-height duration-500 ease-in-out overflow-hidden  my-4 ${!editDates ? "px-3 max-w-full  md:max-w-64  opacity-100" : "max-w-0 opacity-0"}`}>
            Edit travel dates
          </button>
          <SelectTravelDates toggleDatesFunc={toggleEditDates} color="primary-blue" tailw={`transition-max-height duration-500 ease-in-out overflow-hidden  my-4 ${editDates ? "px-3 max-w-full  md:max-w-64  opacity-100" : "max-w-0 opacity-0"}`} />
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-x-0 top-6 flex flex-col justify-center items-center gap-4 z-30 cursor-pointer" onClick={toggleModal}>
          <h1 className="text-center text-2xl font-bold text-white">
            {formattedStartDate} - {formattedEndDate}
          </h1>
          <div className="rounded-full font-bold p-4 bg-white text-primary-blue flex items-center justify-center w-48">
            kr {price} ({nights} {nights > 1 ? "nights" : "night"})
          </div>
        </div>
        <div className="cursor-pointer" onClick={toggleModal}>
          <div className="absolute bg-black bg-opacity-20 w-full h-full rounded-t-lg"></div>
          <img src={venue.media && venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className="w-full h-96 md:h-[42rem] object-cover rounded-lg" />
        </div>
        <div className="absolute inset-x-0 -bottom-4 flex flex-col justify-center items-center gap-4 px-6 md:px-20">
          <CtaBtn type="submit" innerText="Book property" tailw="md:text-2xl py-3 shadow-lg mt-4 md:mt-0 rounded-full bg-primary-blue w-full text-nowrap z-30" mainCta={true} />
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
            <div className="flex flex-col gap-1 w-full items-center">
              <BookingCalendar reserved={reserved} />
            </div>
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
