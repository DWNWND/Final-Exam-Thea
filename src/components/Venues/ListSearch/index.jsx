import LoadingIndicator from "../../LoadingIndicator";
import VenueCard from "../VenueCard";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../../components/DataProvider";

export default function ListSearch({ searchQuery }) {
  const { venues, isLoading } = useContext(DataContext);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [displayedVenues, setDisplayedVenues] = useState([]);
  const initialDisplayCount = 10;

  useEffect(() => {
    // Filter venues based on searchQuery criteria
    const matches = venues.filter((venue) => {
      // Location filter
      if (searchQuery.location && searchQuery.location !== venue.location.city) return false;

      // Amenities filter
      const amenities = [
        { key: "freeWifi", value: venue.meta.wifi },
        { key: "petsAllowed", value: venue.meta.pets },
        { key: "freeParking", value: venue.meta.parking },
        { key: "freeBreakfast", value: venue.meta.breakfast },
      ];
      const amenitiesMatch = amenities.every((amenity) => !searchQuery[amenity.key] || searchQuery[amenity.key] === amenity.value);
      if (!amenitiesMatch) return false;

      // Guest capacity filter
      if (venue.maxGuests < searchQuery.numberOfGuests) return false;

      // Price filter
      const priceFilters = [
        { key: "price100", min: 0, max: 100 },
        { key: "price100to200", min: 100, max: 200 },
        { key: "price200to300", min: 200, max: 300 },
        { key: "price300to400", min: 300, max: 400 },
        { key: "price400to500", min: 400, max: 500 },
        { key: "price500", min: 500, max: Infinity },
      ];
      const priceMatch = priceFilters.some((filter) => searchQuery[filter.key] && venue.price >= filter.min && venue.price < filter.max);
      if (!priceFilters.some((filter) => searchQuery[filter.key]) || priceMatch) return true;

      return false;
    });

    setFilteredVenues(matches);
    setDisplayedVenues(matches.slice(0, initialDisplayCount)); // Set initial displayed venues
  }, [venues, searchQuery]);

  const handleLoadMore = () => {
    const newCount = displayedVenues.length + 10;
    setDisplayedVenues(filteredVenues.slice(0, newCount));
  };

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {filteredVenues.length > 0 ? (
            <>
              <p className="text-black my-4">{`Showing ${displayedVenues.length} of ${filteredVenues.length} venues (matching your search)`}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedVenues.map((venue) => (
                  <VenueCard venue={venue} key={venue.id} />
                ))}
              </div>
              {filteredVenues.length > displayedVenues.length && (
                <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-green text-white rounded-lg">
                  Load more listings
                </button>
              )}
            </>
          ) : (
            <div className="text-center my-6 text-gray-600">No listings match your search.</div>
          )}
        </>
      )}
    </>
  );
}
