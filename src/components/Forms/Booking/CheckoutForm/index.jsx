import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import StringInput from "../../../Inputs/String/index.jsx";
import { useSearchStore } from "../../../../stores/useSearchStore.js";
import formatDateForDisplay from "../../../../utils/dateUtils/formatDateForDisplay.js";
import claculateNightsBetween from "../../../../utils/calcNights/claculateNightsBetween.js";
import useAuthStore from "../../../../stores/useAuthStore.js";
import useBookingDataStore from "../../../../stores/useBookingDataStore.js";
import useApiCall from "../../../../hooks/useApiCall.jsx";
import RoundBtn from "../../../Buttons/RoundBtn/index.jsx";

const url = import.meta.env.VITE_API_BASE_URL;

// Validation schema for registration
// remeber to implement validation on email etc.
const schema = yup.object().shape({
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
  const { accessToken, userName } = useAuthStore();
  const { travelSearchData, selectedVenue } = useSearchStore();
  const { callApiWith, loading, error } = useApiCall(accessToken);
  const { bookingData } = useBookingDataStore();
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
    const sendData = async () => {
      const response = await callApiWith(`${url}/holidaze/bookings`, {
        method: "POST",
        body: JSON.stringify(bookingData),
      });
      console.log("response:", response);
    };
    sendData();

    if (!loading && !error) {
      navigate(`/booking/confirmation`);
    }
  };

  //add more levels of userFeedback for the different errorcodes
  return (
    <div className="max-w-md mx-auto pb-8 mb-4 flex items-center flex-col justify-center">
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
        <h1 className="text-2xl uppercase text-primary-green w-full">Checkout</h1>
        <p className="text-sm italic text-primary-blue w-full">Please checkout to complete your booking</p>
      </div>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <StringInput type="text" id="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" error={errors.cardNumber} register={register} errorMessage={errors.cardNumber && errors.cardNumber.message} />
        <StringInput type="text" id="expiryDate" label="Expiry Date" placeholder="MM/YY" error={errors.expiryDate} register={register} errorMessage={errors.expiryDate && errors.expiryDate.message} />
        <StringInput type="text" id="cvv" label="CVV" placeholder="123" error={errors.cvv} register={register} errorMessage={errors.cvv && errors.cvv.message} />
        <div className="flex items-center justify-between">
          <RoundBtn type="submit" innerText="Complete payment" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
        </div>
        <p className="text-danger">{loading && "Loading..."}</p>
        <p className="text-danger">{error && error}</p>
      </form>
    </div>
  );
}
