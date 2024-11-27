import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { StringInput } from "../../../Inputs";
import { useTravelSearchStore, useBookingDataStore, useTravelDatesStore } from "../../../../stores";
import { calculateNights } from "../../../../utils/";
import { RoundBtn } from "../../../Buttons";
import { useState } from "react";
import { SmallSpinnerLoader } from "../../../Loaders";
import { useApiCall } from "../../../../hooks";

// Validation schema for checkout
const checkoutSchema = yup.object({
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

// Define input types
interface CheckoutFormInputs {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutForm() {
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
    watch,
    trigger,
  } = useForm<CheckoutFormInputs>({
    mode: "onChange",
    resolver: yupResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormInputs) => {
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

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { StringInput } from "../../../Inputs";
// import { useTravelSearchStore, useBookingDataStore, useTravelDatesStore } from "../../../../stores";
// import { calculateNights } from "../../../../utils/";
// import { RoundBtn } from "../../../Buttons";
// import { useState } from "react";
// import { SmallSpinnerLoader } from "../../../Loaders";
// import { useApiCall } from "../../../../hooks";

// // remeber to implement noroff validation on email etc.
// const checkoutSchema = yup.object().shape({
//   cardNumber: yup
//     .string()
//     .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
//     .required("Card number is required"),
//   expiryDate: yup
//     .string()
//     .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry date must be in MM/YY format")
//     .required("Expiry date is required"),
//   cvv: yup
//     .string()
//     .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
//     .required("CVV is required"),
// });

// export default function CheckoutForm() {
//   const { travelSearchData } = useTravelSearchStore();
//   const { scopedLoader, error, callApi } = useApiCall();
//   const { bookingData, selectedListing, setSuccessfulBookingId } = useBookingDataStore();
//   const { savedDates } = useTravelDatesStore();

//   const navigate = useNavigate();
//   // const [errorMessage, setErrorMessage] = useState("");
//   const [userFeedbackMessage, setUserFeedbackMessage] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     watch,
//     trigger,
//   } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(checkoutSchema),
//   });

//   const onSubmit = async () => {
//     // setErrorMessage("");
//     setUserFeedbackMessage("");

//     try {
//       const result = await callApi(`/holidaze/bookings`, {
//         method: "POST",
//         body: JSON.stringify(bookingData),
//       });

//       setSuccessfulBookingId(result.data.id);

//       let countdown = 3;
//       setUserFeedbackMessage(`Payment successful. Redirecting in ${countdown} seconds...`);

//       const countdownInterval = setInterval(() => {
//         countdown -= 1;
//         if (countdown > 0) {
//           setUserFeedbackMessage(`Payment successful. Redirecting in ${countdown} seconds...`);
//         } else {
//           clearInterval(countdownInterval);
//           navigate(`/booking/confirmation/${result.data.id}`);
//         }
//       }, 1000);
//     } catch (err) {
//       console.log("error:", err);
//       // setErrorMessage("Payment failed: " + error);
//     }
//   };

//   const nights = calculateNights(savedDates.startYYYYMMDD, savedDates.endYYYYMMDD);
//   const price = nights * selectedListing.price;

//   return (
//     <div className="flex flex-col gap-6 max-w-[50rem] w-full m-4 p-8 bg-white rounded-lg shadow-sm h-full">
//       <div className="w-full flex flex-col gap-1 bg-comp-purple p-4 rounded-lg">
//         <p className="font-semibold">{selectedListing.name}</p>
//         <p>
//           {savedDates.startDisplay} - {savedDates.endDisplay}
//         </p>
//         <p>{travelSearchData.numberOfGuests} guests</p>
//         <div className="rounded-full font-bold  text-primary-blue">
//           SUM TOTAL: kr {price} ({nights} {nights > 1 ? "nights" : "night"})
//         </div>
//       </div>
//       <div className="w-full my-6">
//         <h1 className="text-2xl uppercase text-primary-green w-full">Checkout</h1>
//         <p className="text-sm italic text-primary-blue w-full">Please checkout to complete your booking</p>
//       </div>
//       <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
//         <StringInput disabled={scopedLoader} type="text" id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" error={errors.cardNumber} register={register} errorMessage={errors.cardNumber && errors.cardNumber.message} watch={watch} trigger={trigger} />
//         <StringInput disabled={scopedLoader} type="text" id="expiryDate" label="Expiry Date" placeholder="MM/YY" error={errors.expiryDate} register={register} errorMessage={errors.expiryDate && errors.expiryDate.message} watch={watch} trigger={trigger} />
//         <StringInput disabled={scopedLoader} type="text" id="cvv" label="CVV" placeholder="123" error={errors.cvv} register={register} errorMessage={errors.cvv && errors.cvv.message} watch={watch} trigger={trigger} />
//         <div className="flex items-center justify-between my-6">
//           <RoundBtn disabled={!isValid || scopedLoader} type="submit" innerText="pay" bgColor={isValid ? "primary-blue" : "comp-gray"} textColor={isValid ? "white" : "primary-light"} borderColor={isValid ? "primary-blue" : "comp"} />
//         </div>
//         {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${error ? "text-danger" : "text-primary-green"} text-xs text-center`}>{error ? error : userFeedbackMessage}</p>}
//       </form>
//     </div>
//   );
// }