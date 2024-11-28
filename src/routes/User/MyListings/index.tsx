import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import { ListingCard } from "../../../components/Cards";
import { SmallSpinnerLoader } from "../../../components/Loaders";
import GeneralErrorFallback from "../../../components/ErrorFallback/GeneralErrorFallback";
import MainElement from "../../../components/MainElement";
import { ListingSpesific } from "../../../types";

export default function MyListings(): JSX.Element {
  const { accessToken, userName } = useAuthStore();
  const { loading, error, callApi } = useApiCall();

  const [allListings, setAllListings] = useState<ListingSpesific[]>([]);
  const [displayedListings, setDisplayedListings] = useState<ListingSpesific[]>([]);
  const [loadMoreLoader, setLoadMoreLoader] = useState<boolean>(false);

  const navigate = useNavigate();

  const initialDisplayCount = 10;

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchListings = async () => {
      const result = await callApi(`/holidaze/profiles/${userName}/venues?_bookings=true`);
      setAllListings(result.data);
    };
    fetchListings();
  }, []);

  useEffect(() => {
    setDisplayedListings(allListings.slice(0, initialDisplayCount));
  }, [allListings]);

  const handleLoadMore = () => {
    setLoadMoreLoader(true);
    const newCount = displayedListings.length + 10;
    setDisplayedListings(allListings.slice(0, newCount));
    setLoadMoreLoader(false);
  };

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`My Listings | ${userName} | Holidaze`}</title>
        <meta name="description" content="View all your published Holidaze listings." />
      </Helmet>
      <MainElement>
        {error && <GeneralErrorFallback errorMessage={error} />}
        <div className="flex flex-col gap-2 bg-comp-green shadow-md p-8 rounded-lg">
          <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My active listings</h2>
          <p className="text-black">{`Showing ${displayedListings.length < allListings.length ? displayedListings.length : allListings.length} of ${allListings.length} ${allListings.length > 1 ? "listings" : "listing"}`}</p>
          {displayedListings && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
              {displayedListings.map((listing) => (
                <ListingCard listing={listing} key={listing.id} loading={loading} myListings={true} />
              ))}
            </div>
          )}
        </div>
        {displayedListings && allListings.length > displayedListings.length && (
          <>
            <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-green text-white rounded-full w-full">
              Load more listings
            </button>
            {loadMoreLoader && <SmallSpinnerLoader />}
          </>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
