import LocationLookAhead from "../LocationLookAhead/index.jsx";
import SelectTravelDates from "../SelectTravelDates/index.jsx";
import NumberOfGuests from "../NumberOfGuests/index.jsx";
import CtaBtn from "../../../Buttons/CtaBtn/index.jsx";
import MoreFilters from "../MoreFilters/index.jsx";
import { useNavigate } from "react-router-dom";

export default function MainSearchForm() {
  const navigate = useNavigate();

  function searchFunc(e) {
    e.preventDefault();
    navigate("/search");
  }

  return (
    <div className="bg-white p-6 rounded-3xl md:m-10 lg:rounded-full lg:pt-20 lg:pl-20 lg:pr-20 md:py-10 shadow-md w-full h-fit">
      <h1 className="text-center mb-8 text-2xl font-bold uppercase text-primary-green">Book your next trip now</h1>
      <form onSubmit={(e) => searchFunc(e)} className="flex flex-col gap-4 md:gap-8" id="search-travel-form">
        <div className="flex flex-col lg:flex-row gap-4">
          <LocationLookAhead color="primary-green" />
          <SelectTravelDates color="primary-green" tailw={"px-3"} />
          <NumberOfGuests color="primary-green" mainSearch={true} />
          <CtaBtn type="submit" innerText="Search" tailw="mt-4 md:mt-0 rounded-full bg-primary-green lg:max-w-8" mainCta={true} />
        </div>
        <MoreFilters color="primary-green" mainSearch={true} />
      </form>
    </div>
  );
}
