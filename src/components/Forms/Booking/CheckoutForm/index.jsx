import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import StringInput from "../../../Inputs/String/index.jsx";
import { useSearchStore, useBookingDataStore, useAuthStore, useTravelDatesStore } from "../../../../stores";
import formatDateForDisplay from "../../../../utils/dateUtils/formatDateForDisplay.js";
import calculateNightsBetween from "../../../../utils/calcNights/calculateNightsBetween.js";
import useApiCall from "../../../../hooks/useApiCall.jsx";
import RoundBtn from "../../../Buttons/RoundBtn/index.jsx";
import { useState } from "react";
import { SmallSpinnerLoader } from "../../../Loaders";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// remeber to implement noroff validation on email etc.
const checkoutSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
    .required("Card number is required"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry date must be in MM/YY format")
    .required("Expiry date is required"),
  cvv: yup
    .string()
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),
});

export default function CheckoutForm() {
  const { accessToken } = useAuthStore();
  const { travelSearchData } = useSearchStore();
  const { callApiWith, loading, error } = useApiCall(accessToken);
  const { bookingData, selectedVenue, setSuccessfulBookingId } = useBookingDataStore();
  const { savedDates } = useTravelDatesStore();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = async () => {
    try {
      const sendData = async () => {
        const response = await callApiWith(`${apiBaseUrl}/holidaze/bookings`, {
          method: "POST",
          body: JSON.stringify(bookingData),
        });
        setSuccessfulBookingId(response.data.id);
        return response.data.id;
      };

      const bookingId = await sendData();

      if (!loading && !error && bookingId) {
        setErrorMessage("");
        setUserFeedbackMessage("Payment successful");
        navigate(`/booking/confirmation/${bookingId}`);
      }
    } catch (error) {
      setErrorMessage("Booking failed: " + error);
      setUserFeedbackMessage("");
    }
  };

  const nights = calculateNightsBetween(savedDates.startYYYYMMDD, savedDates.endYYYYMMDD);
  const price = nights * selectedVenue.price;

  return (
    <div className="flex flex-col gap-6 max-w-[50rem] w-full m-4 p-8 bg-white rounded-lg shadow-sm h-full">
      <div className="w-full flex flex-col gap-1 bg-comp-purple p-4 rounded-lg">
        <p className="font-semibold">{selectedVenue.name}</p>
        <p>
          {savedDates.startDisplay} - {savedDates.endDisplay}
        </p>
        <p>{travelSearchData.numberOfGuests} guests</p>
        <div className="rounded-full font-bold  text-primary-blue">
          SUM TOTAL: kr {price} ({nights} {nights > 1 ? "nights" : "night"})
        </div>
      </div>
      <div className="w-full my-6">
        <h1 className="text-2xl uppercase text-primary-green w-full">Checkout</h1>
        <p className="text-sm italic text-primary-blue w-full">Please checkout to complete your booking</p>
      </div>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="text" id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" error={errors.cardNumber} register={register} errorMessage={errors.cardNumber && errors.cardNumber.message} watch={watch} trigger={trigger} />
        <StringInput type="text" id="expiryDate" label="Expiry Date" placeholder="MM/YY" error={errors.expiryDate} register={register} errorMessage={errors.expiryDate && errors.expiryDate.message} watch={watch} trigger={trigger} />
        <StringInput type="text" id="cvv" label="CVV" placeholder="123" error={errors.cvv} register={register} errorMessage={errors.cvv && errors.cvv.message} watch={watch} trigger={trigger} />
        <div className="flex items-center justify-between my-6">
          <RoundBtn type="submit" innerText="pay" bgColor={isValid ? "primary-blue" : "comp-gray"} textColor={isValid ? "white" : "primary-light"} borderColor={isValid ? "primary-blue" : "comp"} disabled={!isValid} />
        </div>
        {loading ? <SmallSpinnerLoader /> : <p className={`${errorMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorMessage ? errorMessage : userFeedbackMessage}</p>}
      </form>
    </div>
  );
}
