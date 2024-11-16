import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";
import { useContext } from "react";
import { DataContext } from "../../../contexts";
import Loader from "../../../components/Loader";

export default function ListNewest() {
  const { venues, isLoading, setIsLoading, isError } = useContext(DataContext);

  return (
    <>
      <h2 className="font-bold text-2xl md:text-3xl md:ml-4 text-center md:text-left text-primary-green uppercase mb-6">Our newest Listings</h2>
      {/* <>
        {isLoading ? (
          <Loader />
        ) : ( */}
          <>
            {venues && venues.length >= 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
                {venues.slice(0, 10).map((venue) => (
                  <VenueCard venue={venue} key={venue.id} isLoading={isLoading} setIsLoading={setIsLoading} />
                ))}
              </div>
            )}
            <Link className="lg:ml-4 text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
          </>
        {/* )}
      </> */}
    </>
  );
}
