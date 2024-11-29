import { Helmet, HelmetProvider } from "react-helmet-async";
import UserProfile from "../../../components/User/UserProfile";
import ProfileLinks from "../../../components/User/ProfileLinks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import useFetchUser from "../../../hooks/useApiCall.jsx";
import ListBookings from "../../../components/User/ListBookings";
import ListVenues from "../../../components/User/ListVenues";
import { Link } from "react-router-dom";
import MainElement from "../../../components/MainElement/index.jsx";
import Loader from "../../../components/Loader/index.jsx";
import useAuthedFetch from "../../../hooks/useAuthedFetch.jsx";
import SquareBtn from "../../../components/Buttons/SquareBtn/index.jsx";
import SmallLoader from "../../../components/SmallLoader/index.jsx";
import useApiCall from "../../../hooks/useApiCall.jsx";
import { IoIosClose } from "react-icons/io";

// function SelectionBtns({ selector, setSelector }) {
//   return (
//     <div className="flex flex-col gap-2 pt-4 pb-8 lg:flex-row md:justify-center lg:justify-start">
//       <button onClick={() => setSelector("bookings")} className={`${selector === "bookings" ? "bg-primary-green text-white" : "border border-solid border-color-primary-green text-primary-green"} md:w-auto text-nowrap rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
//         My bookings
//       </button>
//       <button onClick={() => setSelector("listings")} className={`${selector === "listings" ? "bg-primary-green text-white" : "border border-solid border-color-primary-green text-primary-green"} md:w-auto text-nowrap rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
//         My listings
//       </button>
//     </div>
//   );
// }

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function MyProfile() {
  const { userName, accessToken } = useAuthStore();
  const { loading: loadingInFetch, error: errorInFetch, fetchWithAuthentication } = useAuthedFetch(accessToken);
  const { loading: loadingCancellation, error: errorCancellation, callApiWith } = useApiCall(accessToken);

  const [user, setUser] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userFeedbackMessage, setUserFeedbackMessage] = useState("");
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState([]);
  const [userVenues, setUserVenues] = useState([]);

  const fetchUser = async () => {
    const response = await fetchWithAuthentication(`/holidaze/profiles/${userName}`);
    setUser(response.data);
  };

  const fetchBookings = async () => {
    const response = await fetchWithAuthentication(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true`);
    setUserBookings(response.data);
  };

  const fetchVenues = async () => {
    const response = await fetchWithAuthentication(`/holidaze/profiles/${userName}/venues?_bookings=true`);
    setUserVenues(response.data);
  };

  useEffect(() => {
    setUserFeedbackMessage("");
    setErrorMessage("");
  }, [cancellationModal]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      fetchUser();
      fetchBookings();
      fetchVenues();
    }
  }, [accessToken]);

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
        <title>My Profile | Holidayz</title>
      </Helmet>
      <MainElement tailw="flex flex-col gap-8 lg:flex-row min-h-screen">
        {errorInFetch && <p className="text-danger text-center">We encountered an unexpected issue while processing your request. Please try again later. If the problem persists, contact our support team.</p>}
        {user && (
          <>
            <section className="flex flex-col gap-2 lg:max-w-md">
              <div className="xl:sticky xl:top-6 xl:pb-9">
                <ProfileLinks venueManager={user.venueManager} />
                <UserProfile user={user} />
              </div>
            </section>
            <section className="w-full pb-10">
              {/* {user.bookings.length >= 1 && user.venues.length >= 1 && <SelectionBtns selector={selector} setSelector={setSelector} />} */}
              <div className="flex flex-col gap-12">
                {userBookings.length >= 1 ? (
                  <ListBookings bookings={userBookings} maxVenuesShown="6" loading={loadingInFetch} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                ) : (
                  <div className="flex flex-col justify-center items-center my-6 gap-4">
                    <p className="italic text-center">You currently have no bookings</p>
                    <Link to="/" className="text-primary-blue underline text-lg">
                      Start planning your next adventure now!
                    </Link>
                  </div>
                )}
                {userVenues.length > 1 && <ListVenues venues={userVenues} maxVenuesShown="6" loading={loadingInFetch} />}
              </div>
            </section>
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
          </>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
