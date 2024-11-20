import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import VenueOccupancy from "../../../components/User/VenueOccupancy/index.jsx";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch.jsx";
import Loader from "../../../components/Loader/index.jsx";
import useApiCall from "../../../hooks/useApiCall.jsx";
import SquareBtn from "../../../components/Buttons/SquareBtn/index.jsx";
import SmallLoader from "../../../components/SmallLoader/index.jsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function Occupancy() {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: bookingData, isLoading: bookingDataLoading, isError: bookingDataError } = useFetch(`${apiBaseUrl}/holidaze/venues/${id}?_bookings=true`);
  const [listing, setListing] = useState([]);
  const { loading: loadingCancellation, error: errorCancellation, callApiWith } = useApiCall(accessToken);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");

  useEffect(() => {
    if (bookingData && bookingData.data) {
      console.log("bookingData.data", bookingData.data);
      setListing(bookingData.data);
    }
  }, [bookingData]);

  const isNotEmpty = (obj) => Object.keys(obj).length > 0;
  const onlyRenderWhenSet = isNotEmpty(listing);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
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
    <>
      {bookingDataLoading ? (
        <Loader />
      ) : (
        <>
          {onlyRenderWhenSet && (
            <HelmetProvider>
              <Helmet prioritizeSeoTags>
                <meta name="description" content="" />
                <title>My Bookings| Holidayz</title>
              </Helmet>
              <MainElement>
                <VenueOccupancy listing={listing} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                {cancellationModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10">
                      <h2 className="text-xl font-bold mb-4 text-primary-green">
                        Are you sure you want to cancel {selectedBooking.customer}'s booking from {selectedBooking.dateFrom} to {selectedBooking.dateTo}?
                      </h2>
                      <p className="text-sm mb-6 text-primary-green">This action cannot be undone.</p>
                      <div className="flex justify-end gap-4 mb-5">
                        <SquareBtn clickFunc={() => handleExitCancellation()} type="button" width="full" innerText="No" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
                        <SquareBtn clickFunc={() => handleCancellation()} type="button" width="full" innerText="Yes" tailw="hover:bg-danger hover:text-white bg-opacity-50" bgColor="white" textColor="danger" borderColor="danger" />
                      </div>
                      {loadingCancellation ? <SmallLoader /> : <p className={`${errorMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorMessage ? errorMessage : userFeedbackMessage}</p>}
                    </div>
                  </div>
                )}
              </MainElement>
            </HelmetProvider>
          )}
        </>
      )}
    </>
  );
}
