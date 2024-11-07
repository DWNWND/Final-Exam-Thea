import LocationLookAhead from "../LocationLookAhead/index.jsx";
import SelectTravelDates from "../SelectTravelDates/index.jsx";
import NumberOfGuests from "../NumberOfGuests/index.jsx";
import CtaBtn from "../../../Buttons/CtaBtn/index.jsx";
import MoreFilters from "../MoreFilters/index.jsx";
import { useSearchStore } from "../../../../stores/useSearchStore.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatDateForDisplay from "../../../../utils/dateUtils/formatDateForDisplay.js";
import ArrowDownBtn from "../../../Buttons/ArrowDownBtn";

export default function ListSearchForm() {
  const [openEditSearch, setOpenEditSearch] = useState(false);
  const { travelSearchData } = useSearchStore();
  const navigate = useNavigate();

  function onSubmit(data) {
    console.log(data);
    // navigate("/search"); //add a reload
  }

  function toggleOpenEditSearch() {
    setOpenEditSearch(!openEditSearch);
  }

  const startDate = new Date(travelSearchData.travelDates.startDate);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(travelSearchData.travelDates.endDate);
  const formattedEndDate = formatDateForDisplay(endDate);

  return (
    <div className="bg-primary-blue p-6 rounded-3xl lg:m-10 md:py-10 shadow-md w-full h-fit xl:sticky xl:top-4">
      <h1 className="text-center text-2xl font-bold text-white">
        from: {formattedStartDate} <br></br> to: {formattedEndDate}
      </h1>
      <p className="text-white text-center my-4">{travelSearchData.numberOfGuests} guests</p>
      <ArrowDownBtn clickFunc={toggleOpenEditSearch} innerText="Edit search" tailw="" mainSearch={false} open={openEditSearch} />
      <form className={`flex flex-col gap-4 md:gap-8 transition-max-height duration-500 ease-in-out overflow-hidden ${openEditSearch ? "max-h-[1000px] opacity-100  mt-6" : "max-h-0 opacity-0"}`} id="update-search-travel-form">
        <div className="flex flex-col gap-4 ">
          <LocationLookAhead color="primary-blue" />
          <SelectTravelDates color="primary-blue" />
          <NumberOfGuests color="white" mainSearch={false} />
          <CtaBtn type="submit" innerText="Update" tailw="mt-4 md:mt-0 rounded-full bg-white" mainCta={false} color="primary-blue" />
        </div>
        <MoreFilters mainSearch={false} color="white"/>
      </form>
    </div>
  );
}
