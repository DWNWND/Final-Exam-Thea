import { IoIosClose } from "react-icons/io";
import { useAuthStore, useBookingDataStore, useTravelDatesStore, useTravelSearchStore } from "../../../stores";
import { SquareBtn } from "../../Buttons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function BookingModal({ toggle, listingIsAvailable }) {
  const { accessToken, userName, logOut } = useAuthStore();
  const { setBookingData, selectedListing } = useBookingDataStore();
  const { travelSearchData } = useTravelSearchStore();
  const { savedDates } = useTravelDatesStore();

  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");

  const navigate = useNavigate();

  const bookPropertyFunc = (continueAs) => {
    if (travelSearchData.numberOfGuests <= selectedListing.maxGuests && listingIsAvailable) {
      const booking = {
        dateFrom: savedDates.startYYYYMMDD,
        dateTo: savedDates.endYYYYMMDD,
        guests: travelSearchData.numberOfGuests,
        venueId: selectedListing.id,
      };
      toggle();

      if (continueAs === userName) {
        setBookingData(booking);
        navigate("/booking/details");
      }
      if (continueAs === "login") {
        setBookingData(booking);
        navigate("/login");
      }
      if (continueAs === "register") {
        setBookingData(booking);
        navigate("/register");
      }
      if (continueAs === "changeAccount") {
        setBookingData(booking);
        logOut();
        navigate("/login");
      }
    } else {
      setUserFeedbackMessage("We're sorry. This property is not available for the selected dates or number of guests. Please select different dates or number of guests");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white relative p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10">
        <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={toggle}>
          <IoIosClose />
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary-blue">Continue booking as:</h2>
        <p className="text-sm mb-6 text-primary-blue">Choose how you would like to proceed with the booking</p>
        <div className="flex flex-col justify-end gap-4">
          {accessToken ? (
            <>
              <SquareBtn clickFunc={bookPropertyFunc} funcProp={userName} type="button" width="full" innerText={`${userName}`} tailw="" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
              <SquareBtn clickFunc={bookPropertyFunc} funcProp="changeAccount" type="button" width="full" innerText="login with a different account" tailw="lowercase" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
            </>
          ) : (
            <>
              <SquareBtn clickFunc={bookPropertyFunc} funcProp="register" type="button" width="full" innerText="register new user" tailw="" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />
              <SquareBtn clickFunc={bookPropertyFunc} funcProp="login" type="button" width="full" innerText="login" tailw="" bgColor="primary-green" textColor="white" borderColor="primary-green" />
            </>
          )}
        </div>
        {userFeedbackMessage && <p className="text-danger text-xs text-center mt-5">{userFeedbackMessage}</p>}
      </div>
    </div>
  );
}
