import LocationLookAhead from "./LocationLookAhead";
import SelectTravelDates from "./SelectTravelDates";
import NumberOfGuests from "./NumberOfGuests";
import { useForm } from "react-hook-form";

export default function SearchForm() {
  const { register, setValue, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="search-travel-form">
        <LocationLookAhead register={register} setValue={setValue} />
        <SelectTravelDates register={register} />
        <NumberOfGuests register={register} setValue={setValue} />
        <input type="submit" />
      </form>
    </>
  );
}
