import LocationLookAhead from "./LocationLookAhead";
import SelectTravelDates from "./SelectTravelDates";
import NumberOfGuests from "./NumberOfGuests";

export default function SearchForm() {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="search-travel-form">
        <LocationLookAhead />
        <SelectTravelDates />
        <NumberOfGuests />
      </form>
    </>
  );
}
