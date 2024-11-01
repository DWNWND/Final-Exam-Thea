import LocationLookAhead from "../LocationLookAhead/index.jsx";
import SelectTravelDates from "../SelectTravelDates/index.jsx";
import NumberOfGuests from "../NumberOfGuests/index.jsx";
import { useForm } from "react-hook-form";
import CtaBtn from "../../Buttons/CtaBtn/index.jsx";
import MoreFilters from "../MoreFilters/index.jsx";
import { useSearchStore } from "../../../stores/useSearchStore.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBtn from "../../Buttons/NavBtn/index.jsx";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";

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
    <div className="bg-primary-blue p-6 rounded-3xl md:m-10 md:py-10 shadow-md w-full h-fit xl:sticky xl:top-4">
      <h1 className="text-center text-2xl font-bold text-white">
        from: {formattedStartDate} <br></br> to: {formattedEndDate}
      </h1>
      <p className="text-white text-center my-4">{travelSearchData.numberOfGuests} guests</p>
      <NavBtn clickFunc={toggleOpenEditSearch} arrow={true} open={openEditSearch} innerText="Edit search" tailw="rounded my-4" color="white"></NavBtn>
      <form className={`flex flex-col gap-4 md:gap-8 transition-max-height duration-500 ease-in-out overflow-hidden ${openEditSearch ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`} id="update-search-travel-form">
        <div className="flex flex-col gap-4 ">
          <LocationLookAhead color={"primary-blue"} />
          <SelectTravelDates color={"primary-blue"} />
          <NumberOfGuests color={"white"} mainSearch={false} />
          <CtaBtn type="submit" innerText="Update" tailw="mt-4 md:mt-0 rounded-full bg-white" mainCta={false} color={"primary-blue"} />
        </div>
        <MoreFilters color={"white"} mainSearch={false} />
      </form>
    </div>
  );
}

// export default function ListSearchForm() {
//   const [openEditSearch, setOpenEditSearch] = useState(false);
//   const { formData, updateFormData } = useSearchStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Prepopulate form with stored data if it exists
//     if (Object.keys(formData).length === 0) {
//       updateFormData(initialFormData); // Replace initialFormData with your default form state
//     }
//   }, [formData]);

//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log(formData); // Accessing formData directly from Zustand store
//     updateFormData(formData);
//     navigate("/search"); // Navigate to search results
//   }

//   function handleClick() {
//     console.log("clicked");
//     setOpenEditSearch(!openEditSearch);
//   }

//   const startDate = new Date(formData.dateRange.startDate);
//   const formattedStartDate = new Intl.DateTimeFormat("en-GB", {
//     weekday: "short",
//     day: "2-digit",
//     month: "short",
//   }).format(startDate);

//   const endDate = new Date(formData.dateRange.endDate);
//   const formattedEndDate = new Intl.DateTimeFormat("en-GB", {
//     weekday: "short",
//     day: "2-digit",
//     month: "short",
//   }).format(endDate);

//   return (
//     <div className="bg-primary-blue p-6 rounded-3xl md:m-10 md:py-10 shadow-md w-full h-fit xl:sticky xl:top-4">
//       <h1 className="text-center text-2xl font-bold text-white">
//         from: {formattedStartDate} <br /> to: {formattedEndDate}
//       </h1>
//       <p className="text-white text-center my-4">{formData.numberOfGuests} guests</p>
//       <NavBtn clickFunc={handleClick} arrow={true} open={openEditSearch} innerText="Edit search" tailw="rounded my-4" color="white" />

//       <form className={`flex flex-col gap-4 md:gap-8 transition-max-height duration-500 ease-in-out overflow-hidden ${openEditSearch ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`} onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-4">
//           {/* Update child components to access and update state directly via Zustand */}
//           <LocationLookAhead color={"primary-blue"} />
//           <SelectTravelDates color={"primary-blue"} />
//           <NumberOfGuests color={"white"} mainSearch={false} />
//           <CtaBtn type="submit" innerText="Update" tailw="mt-4 md:mt-0 rounded-full bg-white" mainCta={false} color={"primary-blue"} />
//         </div>
//         <MoreFilters color={"white"} mainSearch={false} />
//       </form>
//     </div>
//   );
// }
