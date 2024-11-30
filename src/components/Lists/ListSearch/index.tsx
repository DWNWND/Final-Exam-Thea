import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts";
import { ListingCard } from "../../Cards";
import { useTravelSearchStore } from "../../../stores";
import { ListingSpecificProps, DataContextType, TravelSearchData } from "../../../types";
import { RoundBtn } from "../../Buttons";
import { capitalizeWords } from "../../../utils";

export default function ListSearch(): JSX.Element {
  const { travelSearchData } = useTravelSearchStore();
  const { displayedListings, loading } = useContext(DataContext) as DataContextType;

  const [filteredListings, setFilteredListings] = useState<ListingSpecificProps[]>([]);
  const [displayListings, setDisplayListings] = useState<ListingSpecificProps[]>([]);

  const [filters, setFilters] = useState<string>("all listings");

  const initialDisplayCount = 10;
  const searchQuery = travelSearchData;

  useEffect(() => {
    const filtersMatches = displayedListings.filter((listing) => {
      if (searchQuery.location.toLowerCase() && searchQuery.location.toLowerCase() !== listing.location.city.toLowerCase()) {
        return false;
      }

      const amenities: (keyof TravelSearchData)[] = ["freeWifi", "petsAllowed", "freeParking", "freeBreakfast"];
      const amenitiesMatch = amenities.every((amenity) => !travelSearchData[amenity] || travelSearchData[amenity] === listing.meta[amenity.replace("free", "").toLowerCase() as keyof ListingSpecific["meta"]]);
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
        if (filters.toLowerCase().includes("unique")) {
          return listing.name.toLowerCase().includes("unique") || listing.description.toLowerCase().includes("unique");
        } else if (filters.toLowerCase().includes("luxury")) {
          return listing.name.toLowerCase().includes("luxury") || listing.description.toLowerCase().includes("luxury");
        } else if (filters.toLowerCase().includes("rated")) {
          return listing.rating === 5;
        } else {
          return true;
        }
      }
      return false;
    });

    setFilteredListings(filtersMatches);
    setDisplayListings(filtersMatches.slice(0, initialDisplayCount));
  }, [displayedListings, searchQuery, filters]);

  const handleLoadMore = (): void => {
    const newCount = displayListings.length + 10;
    setDisplayListings(filteredListings.slice(0, newCount));
  };

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl text-primary-blue">{travelSearchData.location ? `Results for ${travelSearchData.location}` : capitalizeWords(filters)}</h1>
      <p className=" text-primary-blue my-4">{`Showing ${displayListings.length} of ${filteredListings.length} listings ${travelSearchData.location ? "(matching your search)" : ""}`}</p>
      <div className="flex flex-col gap-2 pt-4 pb-8 lg:flex-row md:justify-center lg:justify-start text-sm justify-between xl:text-lg">
        <RoundBtn clickFunc={() => setFilters("all listings")} tailw="py-2" innerText="All listings" bgColor={filters === "all listings" ? "primary-blue" : "white"} textColor={filters === "all listings" ? "white" : "primary-blue"} borderColor="primary-blue" />
        <RoundBtn clickFunc={() => setFilters("unique listings")} tailw="py-2" innerText="Unique listings" bgColor={filters === "unique listings" ? "primary-blue" : "white"} textColor={filters === "unique listings" ? "white" : "primary-blue"} borderColor="primary-blue" />
        <RoundBtn clickFunc={() => setFilters("luxury stays")} tailw="py-2" innerText="Luxury stays" bgColor={filters === "luxury stays" ? "primary-blue" : "white"} textColor={filters === "luxury stays" ? "white" : "primary-blue"} borderColor="primary-blue" />
        <RoundBtn clickFunc={() => setFilters("top rated properties")} tailw="py-2" innerText="Top rated properties" bgColor={filters === "top rated properties" ? "primary-blue" : "white"} textColor={filters === "top rated properties" ? "white" : "primary-blue"} borderColor="primary-blue" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayListings && displayListings.length > 0 && (
          <>
            {displayListings.map((listing) => (
              <ListingCard listing={listing} key={listing.id} loading={loading} />
            ))}
          </>
        )}
      </div>
      {filteredListings.length > displayListings.length && (
        <button onClick={handleLoadMore} className="mt-4 px-4 py-2 w-full border border-primary-blue text-primary-blue rounded-lg">
          Load more listings
        </button>
      )}
    </section>
  );
}
