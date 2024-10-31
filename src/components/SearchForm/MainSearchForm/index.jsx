import LocationLookAhead from "../LocationLookAhead/index.jsx";
import SelectTravelDates from "../SelectTravelDates/index.jsx";
import NumberOfGuests from "../NumberOfGuests/index.jsx";
import { set, useForm } from "react-hook-form";
import CtaBtn from "../../Buttons/CtaBtn/index.jsx";
import MoreFilters from "../MoreFilters/index.jsx";
import { useSearchStore } from "../../../stores/useSearchStore.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainSearchForm() {
  const { register, setValue, getValues, handleSubmit, reset } = useForm();
  const { formData, setFormData } = useSearchStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Prepopulate form with stored data if it exists
    if (Object.keys(formData).length > 0) {
      reset(formData);
    }
  }, [formData, reset]);

  function onSubmit(data) {
    console.log(data);
    setFormData(data); // Store data in Zustand store
    navigate("/search");
  }

  return (
    <div className="bg-white p-6 rounded-3xl md:m-10 lg:rounded-3xl lg:pt-20 lg:pl-20 lg:pr-20 md:py-10 shadow-md w-full h-fit">
      <h1 className="text-center mb-8 text-2xl font-bold uppercase text-primary-green">Book your next trip now</h1>
      <form className="flex flex-col gap-4 md:gap-8" onSubmit={handleSubmit(onSubmit)} id="search-travel-form">
        <div className="flex flex-col lg:flex-row gap-4">
          <LocationLookAhead register={register} setValue={setValue} color="primary-green" />
          <SelectTravelDates register={register} setValue={setValue} color="primary-green" formData={formData} />
          <NumberOfGuests register={register} setValue={setValue} color="primary-green" mainSearch={true} />
          <CtaBtn type="submit" innerText="Search" tailw="mt-4 md:mt-0 rounded-full bg-primary-green lg:max-w-8" mainCta={true} />
        </div>
        <MoreFilters register={register} setValue={setValue} getValues={getValues} color="primary-green" mainSearch={true} />
      </form>
    </div>
  );
}
