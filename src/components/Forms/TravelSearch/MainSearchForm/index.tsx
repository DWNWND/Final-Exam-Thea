import React from "react";
import { useNavigate } from "react-router-dom";
import { LocationLookAhead, SelectTravelDates, NumberOfGuests, MoreFilters } from "../Filters";
import { RoundBtn } from "../../../Buttons";

export default function MainSearchForm(): JSX.Element {
  const navigate = useNavigate();

  const searchFunc = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <div className="bg-white bg-opacity-90 p-6 rounded-3xl md:m-10 lg:rounded-full lg:pl-20 lg:pr-20 md:py-20 shadow-md w-full h-fit">
      <h1 className="text-center mb-8 text-2xl font-bold uppercase text-primary-green">Book your next trip now</h1>
      <form onSubmit={searchFunc} className="flex flex-col gap-4 md:gap-8" id="search-travel-form">
        <div className="flex flex-col lg:flex-row gap-4">
          <LocationLookAhead color="primary-green" />
          <SelectTravelDates color="primary-green" />
          <NumberOfGuests color="primary-green" mainSearch={true} />
          <RoundBtn type="submit" innerText="Search" bgColor="primary-green" textColor="white" />
        </div>
        <MoreFilters color="primary-green" />
      </form>
    </div>
  );
}

// import LocationLookAhead from "../Filters/LocationLookAhead/";
// import SelectTravelDates from "../Filters/SelectTravelDates/";
// import NumberOfGuests from "../Filters/NumberOfGuests/";
// import MoreFilters from "../Filters/MoreFilters/";
// import { useNavigate } from "react-router-dom";
// import { RoundBtn } from "../../../Buttons";

// export default function MainSearchForm() {
//   const navigate = useNavigate();

//   function searchFunc(e) {
//     e.preventDefault();
//     navigate("/search");
//   }

//   return (
//     <div className="bg-white bg-opacity-90 p-6 rounded-3xl md:m-10 lg:rounded-full lg:pl-20 lg:pr-20 md:py-20 shadow-md w-full h-fit">
//       <h1 className="text-center mb-8 text-2xl font-bold uppercase text-primary-green">Book your next trip now</h1>
//       <form onSubmit={(e) => searchFunc(e)} className="flex flex-col gap-4 md:gap-8" id="search-travel-form">
//         <div className="flex flex-col lg:flex-row gap-4">
//           <LocationLookAhead color="primary-green" />
//           <SelectTravelDates color="primary-green" />
//           <NumberOfGuests color="primary-green" mainSearch={true} />
//           <RoundBtn type="submit" innerText="Search" bgColor="primary-green" textColor="white" />
//         </div>
//         <MoreFilters color="primary-green" />
//       </form>
//     </div>
//   );
// }
