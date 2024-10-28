import LocationLookAhead from "./LocationLookAhead";
import SelectTravelDates from "./SelectTravelDates";
import NumberOfGuests from "./NumberOfGuests";
import { useForm } from "react-hook-form";
import CtaBtn from "../Buttons/CtaBtn";

export default function SearchForm() {
  const { register, setValue, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="flex flex-col bg-white p-4 gap-4 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold uppercase text-primary-green">Book your next trip now</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} id="search-travel-form">
        <LocationLookAhead register={register} setValue={setValue} />
        <SelectTravelDates register={register} setValue={setValue} />
        <NumberOfGuests register={register} setValue={setValue} />
        <CtaBtn type="submit" innerText="Search" tailw="rounded-full shadow-md" color="primary-green" mainCta={true} />
      </form>
    </div>
  );
}
