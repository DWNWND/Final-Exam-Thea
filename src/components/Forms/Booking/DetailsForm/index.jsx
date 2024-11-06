import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import StringInput from "../../../Inputs/String";
import { useSearchStore } from "../../../../stores/useSearchStore.js";
import formatDateForDisplay from "../../../../utils/dateUtils/formatDateForDisplay.js";
import claculateNightsBetween from "../../../../utils/calcNights/claculateNightsBetween.js";
import useAuthStore from "../../../../stores/useAuthStore.js";
import useBookingDataStore from "../../../../stores/useBookingDataStore.js";
import RoundBtn from "../../../Buttons/RoundBtn";

// Validation schema for registration
// remeber to implement validation on email etc.
const schema = yup.object().shape({
  firstName: yup.string().min(3, "Firstname must be at least 3 characters").required("Firstname is required"),
  lastName: yup.string().min(3, "Lastname must be at least 3 characters").required("Lastname is required"),
  checkIn: yup.string().required("Please provide checkin time"),
  specialRequests: yup.string(),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
});

export default function DetailsForm() {
  const { accessToken, userName } = useAuthStore();
  const { travelSearchData, selectedVenue } = useSearchStore();
  const { setBookingData } = useBookingDataStore();
  const navigate = useNavigate();

  const startDate = new Date(travelSearchData.travelDates.startDate);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(travelSearchData.travelDates.endDate);
  const formattedEndDate = formatDateForDisplay(endDate);

  const nights = claculateNightsBetween(travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate);
  const price = nights * selectedVenue.price;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const login = useAuthStore((state) => state.login);

  const onSubmit = () => {
    const booking = {
      dateFrom: travelSearchData.travelDates.startDate,
      dateTo: travelSearchData.travelDates.endDate,
      guests: travelSearchData.numberOfGuests,
      venueId: selectedVenue.id,
    };
    setBookingData(booking);
    navigate("/booking/checkout");
  };

  //add more levels of userFeedback for the different errorcodes
  return (
    <div className="max-w-md mx-auto pb-8 mb-4 flex items-center flex-col justify-center">
      <p className="text-danger text-xs"></p>
      <div className="w-full flex flex-col gap-1 bg-comp-purple p-4 rounded-lg">
        <p className="font-semibold">{selectedVenue.name}</p>
        <p>
          {formattedStartDate} - {formattedEndDate}
        </p>
        <p>{travelSearchData.numberOfGuests} guests</p>
        <div className="rounded-full font-bold  text-primary-blue">
          SUM TOTAL: kr {price} ({nights} {nights > 1 ? "nights" : "night"})
        </div>
      </div>
      <div className="w-full my-6">
        <h1 className="text-2xl uppercase text-primary-green w-full">Your details</h1>
        <p className="text-sm italic text-primary-blue w-full">Please enter your details to complete your booking</p>
      </div>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="text" id="firstName" label="First name" placeholder="Kari" error={errors.firstName} register={register} errorMessage={errors.firstName && errors.firstName.message} />
        <StringInput type="text" id="lastName" label="Last name" placeholder="Nordmann" error={errors.lastName} register={register} errorMessage={errors.lastName && errors.lastName.message} />
        <StringInput type="email" id="email" label="Email address" defaultValue={accessToken && userName} placeholder="example@example.com" error={errors.email} register={register} errorMessage={errors.email && errors.email.message} />
        <StringInput type="text" id="checkIn" label="Check in time" placeholder="14:00" error={errors.checkIn} register={register} errorMessage={errors.checkIn && errors.checkIn.message} />
        <StringInput type="text" id="specialRequests" label="Special requests" placeholder="Please let us know if you have any special requests" error={errors.specialRequests} register={register} errorMessage={errors.specialRequests && errors.specialRequests.message} />
        <div className="flex items-center justify-between">
        <RoundBtn type="submit" innerText="Next" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
        </div>
      </form>
    </div>
  );
}
