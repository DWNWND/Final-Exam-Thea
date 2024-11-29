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

export default function ListSearchForm() {
  const [openEditSearch, setopenEditSearch] = useState(false);
  const { register, setValue, getValues, handleSubmit, reset } = useForm();
  const { formData, updateFormData } = useSearchStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Prepopulate form with stored data if it exists
    if (Object.keys(formData).length > 0) {
      reset(formData);
    }
  }, [formData, reset]);

  function onSubmit(data) {
    console.log(data);
    updateFormData(data); // Store data in Zustand store
    navigate("/search");
  }

  function handleClick() {
    console.log("clicked");
    setopenEditSearch(!openEditSearch);
  }

  return (
    <div className="bg-primary-blue p-6 rounded-3xl md:m-10 md:py-10 shadow-md w-full h-fit xl:sticky xl:top-4">
      <h1 className="text-center text-2xl font-bold text-white">
        from: {formData.allDatesInRange[0]} <br></br> to: {formData.allDatesInRange.at(-1)}
      </h1>
      <p className="text-white text-center my-4">{formData.numberOfGuests} guests</p>
      <NavBtn clickFunc={handleClick} arrow={true} open={openEditSearch} innerText="Edit search" tailw="rounded my-4" color="white"></NavBtn>
      <form className={`flex flex-col gap-4 md:gap-8 transition-max-height duration-500 ease-in-out overflow-hidden ${openEditSearch ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`} onSubmit={handleSubmit(onSubmit)} id="update-search-travel-form">
        <div className="flex flex-col gap-4 ">
          <LocationLookAhead register={register} setValue={setValue} color={"primary-blue"} />
          <SelectTravelDates register={register} setValue={setValue} color={"primary-blue"} />
          <NumberOfGuests register={register} setValue={setValue} color={"white"} mainSearch={false} />
          <CtaBtn type="submit" innerText="Update" tailw="mt-4 md:mt-0 rounded-full bg-white" mainCta={false} color={"primary-blue"} />
        </div>
        <MoreFilters register={register} setValue={setValue} getValues={getValues} color={"white"} mainSearch={false} />
      </form>
    </div>
  );
}

// className="flex flex-col gap-4 md:gap-8"
