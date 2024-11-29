import { useState } from "react";
import { MdEmojiFoodBeverage, MdOutlinePets } from "react-icons/md";
import { FaParking, FaWifi } from "react-icons/fa";
import { useTravelDatesStore } from "../../../stores";
import BookingCalendar from "../../BookingCalendar";
import { ArrowDownBtn } from "../../Buttons";
import { SelectTravelDates } from "../../Forms/TravelSearch/Filters";
import { ListingSpesific, DateRange } from "../../../types";

interface ListingDetailsAccordionProps {
  listing: ListingSpesific;
  listingReserved: DateRange[];
  listingIsAvailable: boolean;
}

export default function ListingDetailsAccordion({ listing, listingReserved, listingIsAvailable }: ListingDetailsAccordionProps): JSX.Element {
  const { savedDates } = useTravelDatesStore();

  const [amenitiesOpen, setAmenitiesOpen] = useState<boolean>(false);
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(false);
  const [availabilityOpen, setAvailabilityOpen] = useState<boolean>(false);
  const [hostDetailsOpen, setHostDetailsOpen] = useState<boolean>(false);
  const [editDates, setEditDates] = useState<boolean>(false);

  const toggleAmenities = () => setAmenitiesOpen(!amenitiesOpen);
  const toggleDescription = () => setDescriptionOpen(!descriptionOpen);
  const toggleAvailability = () => setAvailabilityOpen(!availabilityOpen);
  const toggleHostDetails = () => setHostDetailsOpen(!hostDetailsOpen);
  const toggleEditDates = () => setEditDates(!editDates);

  const accordionBoxStyle = "bg-comp-purple p-4 rounded-lg h-full";
  const accordionContentStyle = "flex flex-col md:flex-row mt-3 gap-4 md:gap-8 p-6 bg-white bg-opacity-70 border border-comp rounded-lg";

  return (
    <div className="flex flex-col gap-2 text-primary-blue">
      <div className={accordionBoxStyle}>
        <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={toggleAmenities}>
          <span className="uppercase font-semibold">Amenities</span>
          <ArrowDownBtn tailw="text-primary-blue border-none" mainSearch={false} link={true} open={amenitiesOpen} />
        </h2>
        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${amenitiesOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={accordionContentStyle}>
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
        </div>
      </div>
      <div className={accordionBoxStyle}>
        <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={toggleDescription}>
          <span className="uppercase font-semibold">Details</span>
          <ArrowDownBtn tailw="text-primary-blue border-none" mainSearch={false} link={true} open={descriptionOpen} />
        </h2>
        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${descriptionOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={accordionContentStyle}>
            <p>{listing.description}</p>
          </div>
        </div>
      </div>
      <div className={accordionBoxStyle}>
        <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={toggleHostDetails}>
          <span className="uppercase font-semibold">Host details</span>
          <ArrowDownBtn tailw="text-primary-blue border-none" mainSearch={false} link={true} open={hostDetailsOpen} />
        </h2>
        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${hostDetailsOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={accordionContentStyle}>
            <div className="m-auto md:m-0">
              <img src={listing.owner.avatar.url} className="w-44 h-44 object-cover rounded-full" alt="Host avatar" />
            </div>
            <div className="flex flex-col gap-1 justify-center text-center md:text-left">
              <p className="font-semibold uppercase text-lg">{listing.owner.name}</p>
              <p className="italic font-light">{listing.owner.bio}</p>
              <a href={`mailto:${listing.owner.email}`} className="underline">
                click here to contact host
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={accordionBoxStyle}>
        <h2 className="flex items-center gap-2 justify-between cursor-pointer" onClick={toggleAvailability}>
          <span className="uppercase font-semibold">Availability</span>
          <ArrowDownBtn tailw="text-primary-blue border-none" mainSearch={false} link={true} open={availabilityOpen} />
        </h2>
        <div className={`transition-max-height duration-500 ease-in-out overflow-hidden ${availabilityOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={accordionContentStyle}>
            {savedDates && savedDates.startYYYYMMDD && (
              <>
                <div className="bg-white flex justify-center rounded-lg w-full">
                  <BookingCalendar reserved={listingReserved} />
                </div>
                <div className="flex flex-col gap-6 rounded-lg w-full">
                  <h3 className="text-primary-blue text-lg font-semibold mt-2">{listingIsAvailable ? "The listing is available for the selected dates" : "The listing is not available for the selected dates"}</h3>
                  <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
                    <div className="flex align-center gap-4">
                      <div className="w-10 h-6 bg-comp-gray rounded-lg"></div>
                      <p>Reserved dates</p>
                    </div>
                    <div className="flex align-center gap-4">
                      <div className="w-10 h-6 border border-primary-blue rounded-lg"></div>
                      <p>Selected dates</p>
                    </div>
                    <div className="flex align-center gap-4">
                      <div className="w-10 h-6 bg-white rounded-lg"></div>
                      <p>Available dates</p>
                    </div>
                  </div>
                  <div className="flex w-full">
                    <button onClick={toggleEditDates} className={`text-nowrap flex  py-2 justify-center w-full h-full uppercase rounded hover:shadow-md cursor-pointer transition-max-height duration-500 ease-in-out items-center overflow-hidden ${!editDates ? "px-4 max-w-full opacity-100" : "max-w-0 w-0 opacity-0 px-0"} bg-white text-primary-blue border border-primary-blue`}>
                      Edit travel dates
                    </button>
                    <SelectTravelDates toggleDatesFunc={toggleEditDates} editDates={editDates} color="primary-blue" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
