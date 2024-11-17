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
import useAuthedFetch from "../../../../hooks/useAuthedFetch.jsx";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigationStore } from "../../../../stores/useNavigationStore.js";

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
  const { setBookingData, setBookingEmail } = useBookingDataStore();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { loading, setLoading, error, fetchUser } = useAuthedFetch(accessToken);
  const setPreviousRoute = useNavigationStore((state) => state.setPreviousRoute);

  const fetchData = async () => {
    const response = await fetchUser(`/holidaze/profiles/${userName}`);
    setUser(response.data);
  };

  useEffect(() => {
    fetchData();
    setPreviousRoute(`/venue/${selectedVenue.id}`);
  }, [accessToken]);

  const startDate = new Date(travelSearchData.travelDates.startDate);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(travelSearchData.travelDates.endDate);
  const formattedEndDate = formatDateForDisplay(endDate);

  const nights = claculateNightsBetween(travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate);
  const price = nights * selectedVenue.price;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user?.name || "",
      lastName: "",
      email: user?.email || "",
      checkIn: "12:00",
      specialRequests: "",
    },
  });

  useEffect(() => {
    if (user) {
      // Update default values dynamically when user data is available
      reset({
        firstName: user.name,
        lastName: "",
        email: user.email,
        checkIn: "12:00",
        specialRequests: "",
      });
    }
  }, [user, reset]);

  // const login = useAuthStore((state) => state.login);

  const onSubmit = () => {
    const booking = {
      dateFrom: travelSearchData.travelDates.startDate,
      dateTo: travelSearchData.travelDates.endDate,
      guests: travelSearchData.numberOfGuests,
      venueId: selectedVenue.id,
    };
    setBookingData(booking);
    setBookingEmail(watch("email"));
    navigate("/booking/checkout");
  };

  //add more levels of userFeedback for the different errorcodes
  return (
    <div className="flex flex-col gap-6 max-w-[50rem] w-full m-4 p-8 bg-white rounded-lg shadow-sm h-full">
      {/* <p className="text-danger text-xs"></p> */}
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
      {/* fix the default value of the email to actually be the email */}
      <form className="w-full flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="text" id="firstName" label="First name" placeholder="Kari" register={register} errorMessage={errors.firstName && errors.firstName.message} trigger={trigger} watch={watch} />
        <StringInput type="text" id="lastName" label="Last name" placeholder="Nordmann" register={register} errorMessage={errors.lastName && errors.lastName.message} trigger={trigger} watch={watch} />
        <StringInput type="email" id="email" label="Email address" placeholder="example@example.com" register={register} errorMessage={errors.email && errors.email.message} trigger={trigger} watch={watch} />
        <StringInput type="text" id="checkIn" label="Check in time" placeholder="14:00" register={register} errorMessage={errors.checkIn && errors.checkIn.message} trigger={trigger} watch={watch} />
        <StringInput type="text" id="specialRequests" label="Special requests" placeholder="Please let us know if you have any special requests" register={register} errorMessage={errors.specialRequests && errors.specialRequests.message} trigger={trigger} watch={watch} />
        <div className="flex items-center justify-between my-6">
          <RoundBtn type="submit" innerText="Next" bgColor={isValid ? "primary-blue" : "comp-gray"} textColor={isValid ? "white" : "primary-light"} borderColor={isValid ? "primary-blue" : "comp"} disabled={!isValid} />
          {/* {loading ? <SmallLoader /> : <p className={`${errorMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorMessage ? errorMessage : userFeedbackMessage}</p>} */}
        </div>
      </form>
    </div>
  );
}
