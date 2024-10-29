import LocationLookAhead from "./LocationLookAhead";
import SelectTravelDates from "./SelectTravelDates";
import NumberOfGuests from "./NumberOfGuests";
import { useForm } from "react-hook-form";
import CtaBtn from "../Buttons/CtaBtn";
import MoreFilters from "./MoreFilters";

export default function SearchForm() {
  const { register, setValue, getValue, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md w-full h-fit">
      <h1 className="text-center mb-8 text-2xl font-bold uppercase text-primary-green">Book your next trip now</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} id="search-travel-form">
        <LocationLookAhead register={register} setValue={setValue} />
        <SelectTravelDates register={register} setValue={setValue} />
        <NumberOfGuests register={register} setValue={setValue} />
        <CtaBtn type="submit" innerText="Search" tailw="mt-4 rounded-full shadow-md bg-primary-green" mainCta={true} />
        <MoreFilters register={register} setValue={setValue} getValue={getValue} />
      </form>
    </div>
  );
}
