import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTravelSearchStore, useBookingDataStore, useTravelDatesStore } from "../../../../stores";
import { calculateNights } from "../../../../utils/";
import { RoundBtn } from "../../../Buttons";
import { useState } from "react";
import { SmallSpinnerLoader } from "../../../Loaders";
import { useApiCall } from "../../../../hooks";

interface CheckoutFormInputs {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const checkoutSchema = yup.object({
  cardNumber: yup
    .string()
    .length(16, "Card number must be exactly 16 digits")
    .matches(/^[0-9]+$/, "Card number must contain only digits")
    .required("Card number is required"),
  expiryDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format")
    .required("Expiry date is required"),
  cvv: yup
    .string()
    .length(3, "CVV must be 3 digits")
    .matches(/^[0-9]+$/, "CVV must contain only digits")
    .required("CVV is required"),
});

export default function CheckoutForm(): JSX.Element {
  const { travelSearchData } = useTravelSearchStore();
  const { scopedLoader, error, callApi } = useApiCall();
  const { bookingData, selectedListing, setSuccessfulBookingId } = useBookingDataStore();
  const { savedDates } = useTravelDatesStore();

  const navigate = useNavigate();
  const [userFeedbackMessage, setUserFeedbackMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutFormInputs>({
    mode: "onChange",
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = async () => {
    setUserFeedbackMessage("");

    try {
      const result = await callApi(`/holidaze/bookings`, {
        method: "POST",
        body: JSON.stringify(bookingData),
      });

      setSuccessfulBookingId(result.data.id);

      let countdown = 3;
      setUserFeedbackMessage(`Payment successful. Redirecting in ${countdown} seconds...`);

      const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          setUserFeedbackMessage(`Payment successful. Redirecting in ${countdown} seconds...`);
        } else {
          clearInterval(countdownInterval);
          navigate(`/booking/confirmation/${result.data.id}`);
        }
      }, 1000);
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  const nights = calculateNights(savedDates.startYYYYMMDD, savedDates.endYYYYMMDD);
  const price = nights * selectedListing.price;

  return (
    <div className="flex flex-col gap-6 max-w-[50rem] w-full m-4 p-8 bg-white rounded-lg shadow-sm h-full">
      <div className="w-full flex flex-col gap-1 bg-comp-purple p-4 rounded-lg">
        <p className="font-semibold">{selectedListing.name}</p>
        <p>
          {savedDates.startDisplay} - {savedDates.endDisplay}
        </p>
        <p>{travelSearchData.numberOfGuests} guests</p>
        <div className="rounded-full font-bold text-primary-blue">
          SUM TOTAL: kr {price} ({nights} {nights > 1 ? "nights" : "night"})
        </div>
      </div>
      <div className="w-full my-6">
        <h1 className="text-2xl uppercase text-primary-green w-full">Checkout</h1>
        <p className="text-sm italic text-primary-blue w-full">Please checkout to complete your booking</p>
      </div>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label htmlFor="cardNumber" className="block text-primary-green mb-2">
            Card Number
          </label>
          <input disabled={scopedLoader} placeholder="1234 5678 9012 3456" type="text" id="cardNumber" {...register("cardNumber")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.cardNumber?.message && "border-danger"}`} />
          {errors.cardNumber?.message && <p className="text-danger text-xs mt-2">{errors.cardNumber?.message}</p>}
        </div>

        <div className="relative">
          <label htmlFor="expiryDate" className="block text-primary-green mb-2">
            Expiry Date
          </label>
          <input disabled={scopedLoader} placeholder="MM/YY" type="text" id="expiryDate" {...register("expiryDate")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.expiryDate?.message && "border-danger"}`} />
          {errors.expiryDate?.message && <p className="text-danger text-xs mt-2">{errors.expiryDate?.message}</p>}
        </div>

        <div className="relative">
          <label htmlFor="cvv" className="block text-primary-green mb-2">
            CVV
          </label>
          <input disabled={scopedLoader} placeholder="123" type="text" id="cvv" {...register("cvv")} className={`focus:border-primary-green active:border-primary-green placeholder:italic placeholder:font-light font-light text-primary-green border active:text-primary-green focus:text-primary-green active:font-normal focus:font-normal border-comp-greenDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none ${errors.cvv?.message && "border-danger"}`} />
          {errors.cvv?.message && <p className="text-danger text-xs mt-2">{errors.cvv?.message}</p>}
        </div>
        <div className="flex items-center justify-between my-6">
          <RoundBtn disabled={!isValid || scopedLoader} type="submit" innerText="Pay" bgColor={isValid ? "primary-blue" : "comp-gray"} textColor={isValid ? "white" : "primary-light"} borderColor={isValid ? "primary-blue" : "comp"} />
        </div>
        {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${error ? "text-danger" : "text-primary-green"} text-xs text-center`}>{error || userFeedbackMessage}</p>}
      </form>
    </div>
  );
}
