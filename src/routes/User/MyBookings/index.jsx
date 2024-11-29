import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import MainElement from "../../../components/MainElement/index.jsx";
import ListBookings from "../../../components/User/ListBookings/index.jsx";
import useAuthedFetch from "../../../hooks/useAuthedFetch.jsx";
import { useState } from "react";
import useApiCall from "../../../hooks/useApiCall.jsx";
import { IoIosClose } from "react-icons/io";
import SquareBtn from "../../../components/Buttons/SquareBtn/index.jsx";

export default function MyBookings() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");
  const { loading: loadingCancellation, error: errorCancellation, callApiWith } = useApiCall(accessToken);
  const [userBookings, setUserBookings] = useState([]);
  const { loading: loadingInFetch, error: errorInFetch, fetchWithAuthentication } = useAuthedFetch(accessToken);

  const fetchBookings = async () => {
    const response = await fetchWithAuthentication(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true`);
    setUserBookings(response.data);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      fetchBookings();
    }
  }, [accessToken]);

  useEffect(() => {
    setUserFeedbackMessage("");
    setErrorMessage("");
  }, [cancellationModal]);

  function handleExitCancellation() {
    setCancellationModal(false);
    setSelectedBooking(null);
  }

  const handleCancellation = async () => {
    try {
      await callApiWith(`${apiBaseUrl}/holidaze/bookings/${selectedBooking.id}`, {
        method: "DELETE",
      });

      if (!loadingCancellation && !errorCancellation) {
        setErrorMessage("");
        setUserFeedbackMessage("Cancellation successful");
        handleExitCancellation();
      }
    } catch (error) {
      setErrorMessage("Cancellation failed: " + error);
      setUserFeedbackMessage("");
    }
  };
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking Success | Holidayz</title>
      </Helmet>
      <MainElement>
        {errorInFetch && <p className="text-danger text-center">We encountered an unexpected issue while processing your request. Please try again later. If the problem persists, contact our support team.</p>}
        {userBookings && userBookings.length > 1 && <ListBookings bookings={userBookings} maxVenuesShown="4" loading={loadingInFetch} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />}
        {cancellationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => handleExitCancellation()}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10 relative">
              <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={() => handleExitCancellation()}>
                <IoIosClose />
              </button>
              <h2 className="text-xl font-bold mb-4 text-primary-blue">Are you sure you want to cancel your booking at {selectedBooking.name}?</h2>
              <p className="text-sm mb-6 text-primary-blue">This action cannot be undone.</p>
              <div className="flex justify-end gap-4 mb-5">
                <SquareBtn clickFunc={() => handleExitCancellation()} type="button" width="full" innerText="No" tailw="hover:bg-primary-blue hover:text-white" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
                <SquareBtn clickFunc={() => handleCancellation()} type="button" width="full" innerText="Yes" tailw="hover:bg-danger hover:text-white" bgColor="white" textColor="danger" borderColor="danger" />
              </div>
              {loadingCancellation ? <SmallLoader /> : <p className={`${errorMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorMessage ? errorMessage : userFeedbackMessage}</p>}
            </div>
          </div>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
