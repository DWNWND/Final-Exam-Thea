import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTravelSearchStore, useBookingDataStore, useAuthStore, useNavigationStore } from "../../../../stores";
import { calculateNights, formatDateForDisplay } from "../../../../utils";
import { RoundBtn } from "../../../Buttons";
import { useApiCall } from "../../../../hooks";
import { useEffect, useState } from "react";
import { DetailsFormSkeletonLoader } from "../../../Loaders";
import { UserSpesific } from "../../../../types";

interface DetailsFormInputs {
  firstName: string;
  lastName: string;
  checkIn: string;
  specialRequests?: string;
  email: string;
}

const detailsSchema = yup.object({
  firstName: yup.string().min(3, "Firstname must be at least 3 characters").required("Firstname is required"),
  lastName: yup.string().min(3, "Lastname must be at least 3 characters").required("Lastname is required"),
  checkIn: yup.string().required("Please provide check-in time"),
  specialRequests: yup.string(),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
});

export default function DetailsForm(): JSX.Element {
  const { accessToken, userName } = useAuthStore();
  const { clearTravelSearchStore } = useTravelSearchStore();
  const { selectedListing, bookingData, setBookingEmail } = useBookingDataStore();
  const { loading, scopedLoader, callApi } = useApiCall();
  const { setPreviousRoute, getLastPreviousRoute } = useNavigationStore();

  const [user, setUser] = useState<UserSpesific | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await callApi<UserSpesific>(`/holidaze/profiles/${userName}`);
      if (result?.data) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    };
    fetchUserData();
  }, [accessToken]);

  useEffect(() => {
    const previousRoute = getLastPreviousRoute();

    if (previousRoute && (previousRoute.includes("login") || previousRoute.includes("register"))) {
      setPreviousRoute(`/listing/${selectedListing.id}`);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<DetailsFormInputs>({
    mode: "onChange",
    resolver: yupResolver(detailsSchema),
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
      reset({
        firstName: user.name,
        lastName: "",
        email: user.email,
        checkIn: "12:00",
        specialRequests: "",
      });
    }
  }, [user]);

  const onSubmit = (data: DetailsFormInputs) => {
    clearTravelSearchStore();
    setBookingEmail(data.email);
    navigate("/booking/checkout");
  };

  const startDate = new Date(bookingData.dateFrom);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(bookingData.dateTo);
  const formattedEndDate = formatDateForDisplay(endDate);

  const nights = calculateNights(bookingData.dateFrom, bookingData.dateTo);
  const price = nights * selectedListing.price;

  return (
    <>
      {loading && <DetailsFormSkeletonLoader />}

      <div className="flex flex-col gap-6 max-w-[50rem] w-full m-4 p-8 bg-white rounded-lg shadow-sm h-full">
        <div className="w-full flex flex-col gap-1 bg-comp-purple p-4 rounded-lg">
          <p className="font-semibold">{selectedListing.name}</p>
          <p>
            {formattedStartDate} - {formattedEndDate}
          </p>
          <p>{bookingData.guests} guests</p>
          <div className="rounded-full font-bold text-primary-blue">
            SUM TOTAL: kr {price} ({nights} {nights > 1 ? "nights" : "night"})
          </div>
        </div>
        <div className="w-full my-6">
          <h1 className="text-2xl uppercase text-primary-green w-full">Your details</h1>
          <p className="text-sm italic text-primary-blue w-full">Please enter your details to complete your booking</p>
        </div>
        <form className="w-full flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <label htmlFor="firstName" className="block text-primary-green mb-2">
              First name
            </label>
            <input disabled={scopedLoader} placeholder="Kari" type="text" id="firstName" {...register("firstName")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.firstName?.message && "border-danger"}`} />
            {errors.firstName?.message && <p className="text-danger text-xs mt-2">{errors.firstName?.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="lastName" className="block text-primary-green mb-2">
              Last name
            </label>
            <input disabled={scopedLoader} placeholder="Nordmann" type="text" id="lastName" {...register("lastName")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.lastName?.message && "border-danger"}`} />
            {errors.lastName?.message && <p className="text-danger text-xs mt-2">{errors.lastName?.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-primary-green mb-2">
              Email address
            </label>
            <input disabled={scopedLoader} placeholder="example@example.com" type="email" id="email" {...register("email")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.email?.message && "border-danger"}`} />
            {errors.email?.message && <p className="text-danger text-xs mt-2">{errors.email?.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="checkIn" className="block text-primary-green mb-2">
              Check-in time
            </label>
            <input disabled={scopedLoader} placeholder="14:00" type="text" id="checkIn" {...register("checkIn")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.checkIn?.message && "border-danger"}`} />
            {errors.checkIn?.message && <p className="text-danger text-xs mt-2">{errors.checkIn?.message}</p>}
          </div>

          <div className="relative">
            <label htmlFor="specialRequests" className="block text-primary-green mb-2">
              Special requests
            </label>
            <textarea disabled={scopedLoader} placeholder="Please let us know if you have any special requests" id="specialRequests" {...register("specialRequests")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.specialRequests?.message && "border-danger"}`} rows={4} />
            {errors.specialRequests?.message && <p className="text-danger text-xs mt-2">{errors.specialRequests?.message}</p>}
          </div>
          <div className="flex items-center justify-between my-6">
            <RoundBtn type="submit" innerText="Next" bgColor={isValid ? "primary-blue" : "comp-gray"} textColor={isValid ? "white" : "primary-light"} borderColor={isValid ? "primary-blue" : "comp"} disabled={!isValid} />
          </div>
        </form>
      </div>
    </>
  );
}