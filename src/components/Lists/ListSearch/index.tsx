import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts";
import { ListingCard } from "../../Cards";
import { useTravelSearchStore } from "../../../stores";
import { ListingSpesific, DataContextType, TravelSearchData } from "../../../types";

export default function ListSearch(): JSX.Element {
  const { travelSearchData } = useTravelSearchStore();
  const { displayedListings, loading } = useContext(DataContext) as DataContextType;
  const [filteredListings, setFilteredListings] = useState<ListingSpesific[]>([]);
  const [displayListings, setDisplayListings] = useState<ListingSpesific[]>([]);
  const initialDisplayCount = 10;
  const searchQuery = travelSearchData;

  useEffect(() => {
    const matches = displayedListings.filter((listing) => {
      if (searchQuery.location.toLowerCase() && searchQuery.location.toLowerCase() !== listing.location.city.toLowerCase()) {
        return false;
      }

      const amenities: (keyof TravelSearchData)[] = ["freeWifi", "petsAllowed", "freeParking", "freeBreakfast"];
      const amenitiesMatch = amenities.every((amenity) => !travelSearchData[amenity] || travelSearchData[amenity] === listing.meta[amenity.replace("free", "").toLowerCase() as keyof ListingSpesific["meta"]]);
      if (!amenitiesMatch) return false;

      if (listing.maxGuests < searchQuery.numberOfGuests) return false;

      const priceFilters: { key: keyof TravelSearchData; min: number; max: number }[] = [
        { key: "price100", min: 0, max: 100 },
        { key: "price100to200", min: 100, max: 200 },
        { key: "price200to300", min: 200, max: 300 },
        { key: "price300to400", min: 300, max: 400 },
        { key: "price400to500", min: 400, max: 500 },
        { key: "price500", min: 500, max: Infinity },
      ];

      const priceMatch = priceFilters.some((filter) => {
        const isFilterActive = searchQuery[filter.key as keyof TravelSearchData];
        const isPriceInRange = listing.price >= filter.min && listing.price < filter.max;
        return isFilterActive && isPriceInRange;
      });

      if (!priceFilters.some((filter) => searchQuery[filter.key as keyof TravelSearchData]) || priceMatch) {
        return true;
      }
      return false;
    });

    setFilteredListings(matches);
    setDisplayListings(matches.slice(0, initialDisplayCount)); 
  }, [displayedListings, searchQuery]);

  const handleLoadMore = (): void => {
    const newCount = displayListings.length + 10;
    setDisplayListings(filteredListings.slice(0, newCount));
  };

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl text-black">Results for {travelSearchData.location}</h1>
      <p className="text-black my-4">{`Showing ${displayListings.length} of ${filteredListings.length} listings (matching your search)`}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayListings.map((listing) => (
          <ListingCard listing={listing} key={listing.id} loading={loading} />
        ))}
      </div>
      {filteredListings.length > displayListings.length && (
        <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-green text-white rounded-lg">
          Load more listings
        </button>
      )}
    </section>
  );
}