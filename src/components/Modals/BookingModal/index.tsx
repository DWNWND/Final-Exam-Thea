import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useAuthStore, useBookingDataStore, useTravelDatesStore, useTravelSearchStore } from "../../../stores";
import { useNavigate } from "react-router-dom";

interface BookingModalProps {
  toggle: () => void;
  listingIsAvailable: boolean;
}

export function BookingModal({ toggle, listingIsAvailable }: BookingModalProps): JSX.Element {
  const { accessToken, userName, logOut } = useAuthStore();
  const { setBookingData, selectedListing } = useBookingDataStore();
  const { travelSearchData } = useTravelSearchStore();
  const { savedDates } = useTravelDatesStore();

  const [userFeedbackMessage, setUserFeedbackMessage] = useState<string>("");

  const navigate = useNavigate();

  const bookPropertyFunc = (continueAs: string): void => {
    if (travelSearchData.numberOfGuests <= selectedListing.maxGuests && listingIsAvailable) {
      const booking = {
        dateFrom: savedDates.startYYYYMMDD,
        dateTo: savedDates.endYYYYMMDD,
        guests: travelSearchData.numberOfGuests,
        venueId: selectedListing.id,
      };
      toggle();

      switch (continueAs) {
        case userName:
          setBookingData(booking);
          navigate("/booking/details");
          break;
        case "login":
          setBookingData(booking);
          navigate("/login");
          break;
        case "register":
          setBookingData(booking);
          navigate("/register");
          break;
        case "changeAccount":
          setBookingData(booking);
          logOut();
          navigate("/login");
          break;
      }
    } else {
      setUserFeedbackMessage("We're sorry. This property is not available for the selected dates or number of guests. Please select different dates or number of guests");
    }
  };

  const buttonClasses = `transition duration-300 ease-in-out text-nowrap flex justify-center p-2 px-4 w-full md:w-full items-center h-full uppercase rounded cursor-pointer `;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white relative p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10">
        <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={toggle}>
          <IoIosClose />
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary-blue">Continue booking as:</h2>
        <p className="text-sm mb-6 text-primary-blue">Choose how you would like to proceed with the booking</p>
        <div className="flex flex-col justify-end gap-4">
          {accessToken && userName ? (
            <>
              <button type="button" onClick={() => bookPropertyFunc(userName)} className={`${buttonClasses} text-white bg-primary-green border border-primary-green`}>
                {userName}
              </button>
              <button type="button" onClick={() => bookPropertyFunc("changeAccount")} className={`${buttonClasses} lowercase text-white bg-primary-blue border border-primary-blue`}>
                login with a different account
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => bookPropertyFunc("register")} className={`${buttonClasses} text-white bg-primary-green border border-primary-green`}>
                register new user
              </button>
              <button type="button" onClick={() => bookPropertyFunc("login")} className={`${buttonClasses}  text-primary-blue bg-white border border-primary-blue`}>
                login
              </button>
            </>
          )}
        </div>
        {userFeedbackMessage && <p className="text-danger text-xs text-center mt-5">{userFeedbackMessage}</p>}
      </div>
    </div>
  );
}
