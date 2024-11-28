import { useState } from "react";
import { LocationLookAhead, SelectTravelDates, NumberOfGuests, MoreFilters } from "../Filters";
import { useTravelSearchStore, useTravelDatesStore } from "../../../../stores";
import { ArrowDownBtn } from "../../../Buttons";

export default function ListSearchForm(): JSX.Element {
  const [openEditSearch, setOpenEditSearch] = useState<boolean>(false);
  const { savedDates } = useTravelDatesStore();
  const { travelSearchData } = useTravelSearchStore();

  const toggleOpenEditSearch = (): void => {
    setOpenEditSearch(!openEditSearch);
  };

  return (
    <div className="bg-primary-blue p-6 rounded-lg shadow-md w-full h-fit xl:sticky xl:top-20">
      <h1 className="text-center text-2xl font-bold text-white">
        from: {savedDates.startDisplay} <br /> to: {savedDates.endDisplay}
      </h1>
      <p className="text-white text-center my-4">{travelSearchData.numberOfGuests} guests</p>
      <ArrowDownBtn clickFunc={toggleOpenEditSearch} innerText="Edit search" tailw="uppercase" mainSearch={false} open={openEditSearch} />
      <form className={`flex flex-col gap-4 md:gap-8 transition-max-height duration-500 ease-in-out overflow-hidden ${openEditSearch ? "max-h-[1000px] opacity-100  mt-6" : "max-h-0 opacity-0"}`} id="update-search-travel-form">
        <div className="flex flex-col gap-4">
          <LocationLookAhead color="primary-blue" />
          <SelectTravelDates color="primary-blue" />
          <NumberOfGuests color="white" mainSearch={false} />
        </div>
        <MoreFilters mainSearch={false} color="white" />
      </form>
    </div>
  );
}

// import LocationLookAhead from "../Filters/LocationLookAhead/";
// import SelectTravelDates from "../Filters/SelectTravelDates/";
// import NumberOfGuests from "../Filters/NumberOfGuests/";
// import MoreFilters from "../Filters/MoreFilters/";
// import { useTravelSearchStore } from "../../../../stores";
// import { useState } from "react";
// import { ArrowDownBtn } from "../../../Buttons";
// import { useTravelDatesStore } from "../../../../stores";

// export default function ListSearchForm() {
//   const [openEditSearch, setOpenEditSearch] = useState(false);
//   const { savedDates } = useTravelDatesStore();
//   const { travelSearchData } = useTravelSearchStore();

//   function toggleOpenEditSearch() {
//     setOpenEditSearch(!openEditSearch);
//   }

//   return (
//     <div className="bg-primary-blue p-6 rounded-lg shadow-md w-full h-fit xl:sticky xl:top-20">
//       <h1 className="text-center text-2xl font-bold text-white">
//         from: {savedDates.startDisplay} <br></br> to: {savedDates.endDisplay}
//       </h1>
//       <p className="text-white text-center my-4">{travelSearchData.numberOfGuests} guests</p>
//       <ArrowDownBtn clickFunc={toggleOpenEditSearch} innerText="Edit search" tailw="uppercase" mainSearch={false} open={openEditSearch} />
//       <form className={`flex flex-col gap-4 md:gap-8 transition-max-height duration-500 ease-in-out overflow-hidden ${openEditSearch ? "max-h-[1000px] opacity-100  mt-6" : "max-h-0 opacity-0"}`} id="update-search-travel-form">
//         <div className="flex flex-col gap-4 ">
//           <LocationLookAhead color="primary-blue" />
//           <SelectTravelDates color="primary-blue" />
//           <NumberOfGuests color="white" mainSearch={false} />
//         </div>
//         <MoreFilters mainSearch={false} color="white" />
//       </form>
//     </div>
//   );
// }